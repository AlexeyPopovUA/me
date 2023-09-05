import {Construct} from 'constructs';
import {Stack, StackProps} from 'aws-cdk-lib';
import {Certificate, CertificateValidation} from "aws-cdk-lib/aws-certificatemanager";
import {AaaaRecord, ARecord, HostedZone, RecordTarget} from "aws-cdk-lib/aws-route53";
import {HttpLambdaIntegration} from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import {
    DomainName,
    HttpApi,
    HttpMethod,
    HttpStage,
    MappingValue,
    ParameterMapping
} from "@aws-cdk/aws-apigatewayv2-alpha";

import {ApiGatewayv2DomainProperties} from "aws-cdk-lib/aws-route53-targets";

// monorepo dependencies
import {DemoConstruct} from "demo/src/demo-construct";

import configuration from "../../cfg/configuration";

export class ServiceStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const project = configuration.COMMON.project;
        const environmentKey = "environment";
        const stageName = configuration.COMMON.defaultEnvironment;

        const hostedZone = HostedZone.fromHostedZoneAttributes(this, `${project}-hosted-zone`, {
            hostedZoneId: configuration.HOSTING.hostedZoneID,
            zoneName: configuration.HOSTING.hostedZoneName
        });

        const certificate = new Certificate(this, `${project}-cert`, {
            domainName: configuration.HOSTING.serviceDomainName,
            validation: CertificateValidation.fromDns(hostedZone)
        });

        const lambdaDemoConstruct = new DemoConstruct(this, `${project}-demo-lambda`, {
            name: "demo",
            region: props.env?.region!,
            project,
            debug: true
        });

        const lambdaDemoIntegration = new HttpLambdaIntegration(`${project}-demo-integration`, lambdaDemoConstruct.lambda, {
            parameterMapping: new ParameterMapping().overwritePath(MappingValue.requestPath())
        });

        const apiGateway = new HttpApi(this, `${project}-api-gateway`, {
            apiName: `${project}-api`,
            createDefaultStage: false
        });

        apiGateway.addRoutes({
            integration: lambdaDemoIntegration,
            path: "/demo",
            methods: [HttpMethod.GET, HttpMethod.POST, HttpMethod.OPTIONS]
        });

        const domainName = new DomainName(this, `${project}-domain-name`, {
            domainName: configuration.HOSTING.serviceDomainName,
            certificate
        });

        new HttpStage(this, `${project}-stage`, {
            stageName,
            httpApi: apiGateway,
            autoDeploy: true,
            domainMapping: {
                domainName
            }
        });

        new ARecord(this, `${project}-record-a`, {
            recordName: configuration.HOSTING.serviceDomainName,
            zone: hostedZone,
            target: RecordTarget.fromAlias(new ApiGatewayv2DomainProperties(domainName.regionalDomainName, domainName.regionalHostedZoneId))
        });

        new AaaaRecord(this, `${project}-record-4a`, {
            recordName: configuration.HOSTING.serviceDomainName,
            zone: hostedZone,
            target: RecordTarget.fromAlias(new ApiGatewayv2DomainProperties(domainName.regionalDomainName, domainName.regionalHostedZoneId))
        });
    }
}
