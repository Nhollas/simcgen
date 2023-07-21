export type GetClassIdsResponse = {
  classes: Class[];
  _links: Links;
};

type Class = {
  key: Key;
  name: string;
  id: number;
};

interface Key {
  href: string;
}

interface Links {
  self: Self;
}

interface Self {
  href: string;
}
