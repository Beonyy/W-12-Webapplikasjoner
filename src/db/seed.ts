// Testdata. Kjør med:
//   npm run seed      (eller pnpm seed)

import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { animals } from "./schema";
import { relations } from "./relations";
import { Species } from "./features/animals/enum";

export const seedData = async (env: Env) => {
  const db = drizzle(env.DB, { relations });

  await db.delete(animals);

  const seedAnimals = [
  {
    name: "Siri",
    species: Species.Cat,
    nickname: "Siripia",
    dateOfBirth: "2021-04-12",
    characteristics: "Trefarget, hvite poter",
    housingUnit: "K102",
    contactInfo: "Tlf: 91234567",
  },
  {
    name: "Bamse",
    species: Species.Dog,
    nickname: "Bamsen",
    dateOfBirth: "",
    characteristics: "Mørkebrun",
    housingUnit: "H1404",
    contactInfo: "",
  },
  {
    name: "Pippin",
    species: Species.Bird,
    nickname: "",
    dateOfBirth: "",
    characteristics: "",
    housingUnit: "F205",
    contactInfo: "Tlf: 90011223",
  },
  {
    name: "Bella",
    species: Species.Dog,
    nickname: "Lillemor",
    dateOfBirth: "2020-08-01",
    characteristics: "Sort pels, kort hale",
    housingUnit: "H101",
    contactInfo: "Tlf: 98765432",
  },
  {
    name: "Felix",
    species: Species.Cat,
    nickname: "",
    dateOfBirth: "2018-05-20",
    characteristics: "Gråstript, grønne øyne",
    housingUnit: "K105",
    contactInfo: "",
  },
  {
    name: "Stampus",
    species: Species.Rabbit,
    nickname: "Stampe",
    dateOfBirth: "",
    characteristics: "Hvit, lange ører",
    housingUnit: "R301",
    contactInfo: "Tlf: 41238901",
  },
  {
    name: "Snorre",
    species: Species.Dog,
    nickname: "",
    dateOfBirth: "2022-02-14",
    characteristics: "Gylden, lange ører",
    housingUnit: "H102",
    contactInfo: "",
  },
  {
    name: "Kasper",
    species: Species.Cat,
    nickname: "Kass",
    dateOfBirth: "",
    characteristics: "",
    housingUnit: "K101",
    contactInfo: "Tlf: 93456789",
  },
  {
    name: "Gullik",
    species: Species.Fish,
    nickname: "",
    dateOfBirth: "",
    characteristics: "Rød åtte-tallsslør",
    housingUnit: "A001",
    contactInfo: "",
  },
  {
    name: "Zorro",
    species: Species.Reptile,
    nickname: "Zorros",
    dateOfBirth: "2019-11-11",
    characteristics: "Grønn, mørke striper",
    housingUnit: "T402",
    contactInfo: "Tlf: 45678912",
  },
  {
    name: "Lotte",
    species: Species.Dog,
    nickname: "Lottemor",
    dateOfBirth: "2021-09-30",
    characteristics: "Flekket, halvt øre",
    housingUnit: "H103",
    contactInfo: "Tlf: 92345678",
  },
  {
    name: "Pusur",
    species: Species.Cat,
    nickname: "Pusen",
    dateOfBirth: "2017-03-15",
    characteristics: "Rødstripete, rund",
    housingUnit: "K103",
    contactInfo: "",
  },
  {
    name: "Polly",
    species: Species.Bird,
    nickname: "",
    dateOfBirth: "",
    characteristics: "Rød og blå",
    housingUnit: "F201",
    contactInfo: "Tlf: 91122334",
  },
  {
    name: "Ludvik",
    species: Species.Rabbit,
    nickname: "Lille-Ludde",
    dateOfBirth: "2022-06-10",
    characteristics: "Grå, stubbhale",
    housingUnit: "R302",
    contactInfo: "",
  },
  {
    name: "Frida",
    species: Species.Dog,
    nickname: "",
    dateOfBirth: "",
    characteristics: "",
    housingUnit: "H104",
    contactInfo: "Tlf: 40011223",
  },
  {
    name: "Mons",
    species: Species.Cat,
    nickname: "Monsemann",
    dateOfBirth: "2016-12-01",
    characteristics: "Helvart, gule øyne",
    housingUnit: "K104",
    contactInfo: "Tlf: 95566778",
  },
  {
    name: "Nemo",
    species: Species.Fish,
    nickname: "",
    dateOfBirth: "",
    characteristics: "Orange med hvite striper",
    housingUnit: "A002",
    contactInfo: "",
  },
  {
    name: "Ziggy",
    species: Species.Reptile,
    nickname: "",
    dateOfBirth: "2020-01-01",
    characteristics: "Brunskjellig, rolige farger",
    housingUnit: "T401",
    contactInfo: "",
  },
  {
    name: "Ronja",
    species: Species.Dog,
    nickname: "Røverdatter",
    dateOfBirth: "2023-03-22",
    characteristics: "Sort og tan",
    housingUnit: "H105",
    contactInfo: "Tlf: 97788990",
  },
  {
    name: "Truls",
    species: Species.Cat,
    nickname: "",
    dateOfBirth: "",
    characteristics: "",
    housingUnit: "K106",
    contactInfo: "",
  },
  {
    name: "Bugs",
    species: Species.Rabbit,
    nickname: "",
    dateOfBirth: "2021-10-10",
    characteristics: "Brunprikket",
    housingUnit: "R303",
    contactInfo: "Tlf: 93344556",
  },
  {
    name: "Chirpy",
    species: Species.Bird,
    nickname: "Lillemøy",
    dateOfBirth: "",
    characteristics: "Gul, kvikksølv-mønster",
    housingUnit: "F202",
    contactInfo: "",
  },
  {
    name: "Molly",
    species: Species.Dog,
    nickname: "Mollus",
    dateOfBirth: "2019-07-04",
    characteristics: "Hvit, krøllete pels",
    housingUnit: "H106",
    contactInfo: "Tlf: 46677889",
  },
  {
    name: "Simba",
    species: Species.Cat,
    nickname: "Kongen",
    dateOfBirth: "2022-08-19",
    characteristics: "Beige, silkemyk",
    housingUnit: "K107",
    contactInfo: "Tlf: 94455667",
  },
  {
    name: "Snuffy",
    species: Species.Rabbit,
    nickname: "",
    dateOfBirth: "",
    characteristics: "",
    housingUnit: "R304",
    contactInfo: "",
  },
  {
    name: "Balder",
    species: Species.Dog,
    nickname: "Baldergutt",
    dateOfBirth: "2018-02-28",
    characteristics: "Mørkegrå, stor",
    housingUnit: "H107",
    contactInfo: "Tlf: 91100229",
  },
  {
    name: "Mie",
    species: Species.Cat,
    nickname: "",
    dateOfBirth: "2020-05-05",
    characteristics: "Tofarget sort/hvit",
    housingUnit: "K108",
    contactInfo: "",
  },
  {
    name: "Smaragd",
    species: Species.Reptile,
    nickname: "Lille-drage",
    dateOfBirth: "",
    characteristics: "Grasgrønn",
    housingUnit: "T403",
    contactInfo: "Tlf: 41122334",
  },
  {
    name: "Pip",
    species: Species.Bird,
    nickname: "",
    dateOfBirth: "2022-11-12",
    characteristics: "Blå, hvit maske",
    housingUnit: "F203",
    contactInfo: "",
  },
  {
    name: "Trofast",
    species: Species.Dog,
    nickname: "Trofasten",
    dateOfBirth: "2015-01-01",
    characteristics: "Gråspraglete, senior",
    housingUnit: "H108",
    contactInfo: "Tlf: 99887766",
  },
];

  //drizzle crashes if you do 30 inserts
  for (let i = 0; i < seedAnimals.length; i += 8) {
    await db.insert(animals).values(seedAnimals.slice(i, i+8));
  };

  console.log("Seeding finished");
};

export default defineScript(async ({ env }) => {
  await seedData(env);
  return Response.json({ success: true });
});
