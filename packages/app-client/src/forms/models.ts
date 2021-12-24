export interface LinkForm {
  id: number;
  text: string;
  href: string;
  readonly order: number
}

export interface ValidatedLinkForm {
  id: number;
  readonly order: number
  text: {
    val: string
    error?: string
  };
  href: {
    val: string
    error?: string
  };
}

export function validateLinkForm(links: LinkForm[]): ValidatedLinkForm[] {
  return links.map<ValidatedLinkForm>((x) => {
    return {
      id: x.id,
      order: x.order,
      text: {
        error: Boolean(x.text?.length) ? undefined : "Text cannot be empty",
        val: x.text,
      },
      href: {
        error: Boolean(x.href?.length) ? undefined : "Link cannot be empty",
        val: x.href
      }
    };
  });
}
