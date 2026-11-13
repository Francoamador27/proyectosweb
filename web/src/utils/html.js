// El HTML del CMS a veces trae <h1>; la página ya tiene su propio h1 (SEO: uno solo).
export const demoteH1 = (html = "") => html.replace(/<(\/?)h1(\s|>)/gi, "<$1h2$2");

export const isRichHtml = (str = "") => /<[a-z][\s\S]*>/i.test(str);
