import Handlebars from "handlebars";
import fs from "fs";

export async function generateTemplate(templateName: string, data: Record<string, any>) {
  const baseTemplatesPath = "src/templates";
  const source = fs.readFileSync(`${baseTemplatesPath}/${templateName}`, "utf8");
  const template = Handlebars.compile(source);
  const htmlContent = template(data);
  return htmlContent;
}
