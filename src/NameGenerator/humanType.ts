export type FamilyName = {
  familyName: string;
  familyNameKana: string;
  familyNameRome: string;
};

export type GivenName = {
  givenName: string;
  givenNameKana: string;
  givenNameRome: string;
};

export type Sex = "female" | "male";

export type Human = FamilyName & GivenName & { sex: Sex };
