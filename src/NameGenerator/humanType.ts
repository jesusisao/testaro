export type FamilyName = {
  familyName: string;
  familyNameKana: string;
};

export type GivenName = {
  givenName: string;
  givenNameKana: string;
};

export type Sex = "female" | "male";

export type Human = FamilyName & GivenName & { sex: Sex };
