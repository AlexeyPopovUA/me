const Footer = () => (
    <div className="print:hidden flex-col text-center p-8 border-t-2">
        <div className="mb-4">Developed by Oleksii Popov</div>
        <div>{new Date().getFullYear()}</div>
    </div>
);

export default Footer;
