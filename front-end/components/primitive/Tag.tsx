import React from "react";

const Tag = ({item}: { item: React.ReactNode }) => <span className="py-0 px-1 rounded-md bg-slate-100 text-nowrap text-md">{item}</span>;

export default Tag;
