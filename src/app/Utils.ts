import { UrlWithParsedQuery, parse } from "url";

export class Utils {
  public static parseUrl(url: string): UrlWithParsedQuery {
    if (!url) {
      throw new Error("Url is empty");
    }
    return parse(url, true);
  }

  public static toUpperCase(arg: String) {
    return arg.toUpperCase();
  }
}
