declare namespace li {
  /**
   * Parse a Link header string according to [RFC 5988](http://www.w3.org/Protocols/9707-link-header.html).
   */
  function parse(
    linksHeader: string
  ): {
    [key: string]: string;
  };
  function parse(
    linksHeader: string,
    options: {
      extended: true;
    }
  ): ({
    link: string;
    rev?: string[];
    rel?: string[];
  } & {
    [key: string]: string;
  })[];

  /**
   * Format a Link header according to [RFC 5988](http://www.w3.org/Protocols/9707-link-header.html).
   */
  function stringify(params: { [key: string]: string }): string;
}

export = li;
