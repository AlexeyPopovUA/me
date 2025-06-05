const Footer = () => (
    <div className="print:hidden flex-col text-center p-8 border-t-2">
        <div className="mb-4">Developed by Oleksii Popov</div>
        <div className="mb-4">VAT (Austria): ATU81970958</div>
        <div>{new Date().getFullYear()}</div>
    </div>
);

export default Footer;
