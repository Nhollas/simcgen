export type GetSpecIdsResponse = {
  _links: Links;
  character_specializations: CharacterSpecialization[];
  pet_specializations: PetSpecialization[];
};

interface Links {
  self: Self;
}

interface Self {
  href: string;
}

interface CharacterSpecialization {
  key: Key;
  name: string;
  id: number;
}

interface Key {
  href: string;
}

interface PetSpecialization {
  key: Key;
  name: string;
  id: number;
}
