import {resolve} from "node:path";
import {Construct} from 'constructs';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {IFunction, Runtime} from "aws-cdk-lib/aws-lambda";
import {Duration, RemovalPolicy} from "aws-cdk-lib";
import {LogGroup, RetentionDays} from "aws-cdk-lib/aws-logs";

export type CustomProps = {
    region: string;
    project: string;
    name: string;
    debug?: boolean;
};

export class DemoConstruct extends Construct {
    public lambda: IFunction;

    constructor(scope: Construct, id: string, props: CustomProps) {
        super(scope, id);

        // Replace deprecated logRetention. Do not set logGroupName: the current
        // group is /aws/lambda/<generated function name> and is not a stack
        // resource. A generated name creates a new group and leaves that one
        // in place. RETAIN matches the LogGroup default so a later update
        // cannot delete the new group either.
        const logGroup = new LogGroup(this, "LogGroup", {
            retention: RetentionDays.ONE_DAY,
            removalPolicy: RemovalPolicy.RETAIN,
        });

        this.lambda = new NodejsFunction(this, `${props.project}-${props.name}-lambda`, {
            handler: "handler",
            // Managed runtime. AWS patches nodejs24.x in the default Auto
            // update mode; there is no patch-level identifier to pin.
            runtime: Runtime.NODEJS_24_X,
            entry: resolve(process.cwd(), "../back-end/demo/src/lambda.ts"),
            timeout: Duration.seconds(10),
            logGroup,
            memorySize: 128,
            description: `${props.project}-${props.name}-lambda`,
            bundling: {
                externalModules: ['@aws-sdk/*'],
                nodeModules: ['@vendia/serverless-express'],
                // Isolated CDK installs don't inherit workspace pnpm config
                environment: {
                    pnpm_config_minimum_release_age: '0',
                },
            },
            environment: {
                REGION: props.region,
                DEBUG: props.debug ? "express:*" : ""
            }
        });
    }
}
