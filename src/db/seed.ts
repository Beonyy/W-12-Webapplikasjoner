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
      name: "Buster",
      species: Species.Dog,
      nickname: "Bus",
      dateOfBirth: "2022-05-10T00:00:00.000Z",
      characteristics: "golden fur, friendly, missing tip of left ear",
      housingUnit: "D201",
      contactInfo: "phone: 12345678",
    },
    {
      name: "Barnaby",
      species: Species.Rabbit,
      nickname: "Barns",
      dateOfBirth: "2023-01-15T00:00:00.000Z",
      characteristics: "floppy ears, white spot on nose",
      housingUnit: "R05",
      contactInfo: "email: owner@example.com",
    },
    {
      name: "Luna",
      species: Species.Cat,
      nickname: "Lu",
      dateOfBirth: "2021-08-20T00:00:00.000Z",
      characteristics: "black coat, green eyes, very vocal",
      housingUnit: "H102",
      contactInfo: "phone: 87654321",
    },
    {
      name: "Coco",
      species: Species.Bird,
      nickname: "Cout",
      dateOfBirth: "2023-03-11T00:00:00.000Z",
      characteristics: "yellow feathers, green wings, talks a lot",
      housingUnit: "B12",
      contactInfo: "email: birdlover@example.com",
    },
    {
      name: "Spike",
      species: Species.Reptile,
      nickname: "Spiky",
      dateOfBirth: "2020-11-05T00:00:00.000Z",
      characteristics: "green scales, bearded dragon, calm temperament",
      housingUnit: "RE01",
      contactInfo: "phone: 55512345",
    },
    {
      name: "Goldie",
      species: Species.Fish,
      nickname: "Gold",
      dateOfBirth: "",
      characteristics: "bright orange fins, small black dot on tail",
      housingUnit: "F04",
      contactInfo: "",
    },
    {
      name: "Max",
      species: Species.Dog,
      nickname: "Maxie",
      dateOfBirth: "2019-07-30T00:00:00.000Z",
      characteristics: "german shepherd mix, energetic, loyal",
      housingUnit: "D202",
      contactInfo: "phone: 44433322",
    },
    {
      name: "Mimi",
      species: Species.Cat,
      nickname: "Mim",
      dateOfBirth: "2022-02-14T00:00:00.000Z",
      characteristics: "calico pattern, shy around strangers",
      housingUnit: "H103",
      contactInfo: "email: mimi@example.com",
    },
    {
      name: "Thumper",
      species: Species.Rabbit,
      nickname: "Thump",
      dateOfBirth: "2023-06-01T00:00:00.000Z",
      characteristics: "grey fur, large hind legs, energetic hopper",
      housingUnit: "R06",
      contactInfo: "",
    },
    {
      name: "Kiwi",
      species: Species.Bird,
      nickname: "Kiki",
      dateOfBirth: "",
      characteristics: "green budgie, small blue tail feathers",
      housingUnit: "B14",
      contactInfo: "phone: 99887766",
    },
    {
      name: "Rex",
      species: Species.Reptile,
      nickname: "Rexy",
      dateOfBirth: "2021-09-19T00:00:00.000Z",
      characteristics: "leopard gecko, spotted yellow and black skin",
      housingUnit: "RE02",
      contactInfo: "email: reptileguy@example.com",
    },
    {
      name: "Bubbles",
      species: Species.Fish,
      nickname: "Bubble",
      dateOfBirth: "",
      characteristics: "blue betta fish, flowing fins",
      housingUnit: "F08",
      contactInfo: "",
    },
    {
      name: "Rocky",
      species: Species.Dog,
      nickname: "Rock",
      dateOfBirth: "2020-03-22T00:00:00.000Z",
      characteristics: "boxer breed, brown and white patches, playful",
      housingUnit: "D205",
      contactInfo: "phone: 11223344",
    },
    {
      name: "Simba",
      species: Species.Cat,
      nickname: "Sim",
      dateOfBirth: "2021-12-05T00:00:00.000Z",
      characteristics: "orange tabby, white chest, green eyes",
      housingUnit: "H105",
      contactInfo: "email: simba@example.com",
    },
    {
      name: "Clover",
      species: Species.Rabbit,
      nickname: "Clove",
      dateOfBirth: "2022-10-10T00:00:00.000Z",
      characteristics: "dwarf rabbit, all white fur, blue eyes",
      housingUnit: "R08",
      contactInfo: "phone: 33445566",
    },
    {
      name: "Sky",
      species: Species.Bird,
      nickname: "Skye",
      dateOfBirth: "2023-04-25T00:00:00.000Z",
      characteristics: "blue lovebird, yellow collar",
      housingUnit: "B15",
      contactInfo: "",
    },
    {
      name: "Slither",
      species: Species.Reptile,
      nickname: "Sith",
      dateOfBirth: "2018-05-12T00:00:00.000Z",
      characteristics: "corn snake, red and orange band patterns",
      housingUnit: "RE03",
      contactInfo: "phone: 77889900",
    },
    {
      name: "Finley",
      species: Species.Fish,
      nickname: "Fin",
      dateOfBirth: "",
      characteristics: "guppy, multicolored tail",
      housingUnit: "F10",
      contactInfo: "",
    },
    {
      name: "Zeus",
      species: Species.Dog,
      nickname: "Z",
      dateOfBirth: "2019-11-18T00:00:00.000Z",
      characteristics: "rottweiler, black and tan, strong build",
      housingUnit: "D210",
      contactInfo: "email: zeusowner@example.com",
    },
    {
      name: "Cleo",
      species: Species.Cat,
      nickname: "Cleo",
      dateOfBirth: "2022-07-07T00:00:00.000Z",
      characteristics: "siamese markings, blue eyes, sleek fur",
      housingUnit: "H110",
      contactInfo: "phone: 66554433",
    },
    {
      name: "Hazel",
      species: Species.Rabbit,
      nickname: "Hazy",
      dateOfBirth: "2023-02-28T00:00:00.000Z",
      characteristics: "brown agouti fur, black tips on ears",
      housingUnit: "R10",
      contactInfo: "",
    },
    {
      name: "Mango",
      species: Species.Bird,
      nickname: "Mangi",
      dateOfBirth: "2022-09-09T00:00:00.000Z",
      characteristics: "orange and yellow cockatiel, crest on head",
      housingUnit: "B20",
      contactInfo: "email: mango@example.com",
    },
    {
      name: "Scales",
      species: Species.Reptile,
      nickname: "Scaly",
      dateOfBirth: "2021-03-03T00:00:00.000Z",
      characteristics: "ball python, dark brown and tan pattern",
      housingUnit: "RE04",
      contactInfo: "phone: 22114455",
    },
    {
      name: "Splash",
      species: Species.Fish,
      nickname: "Splasher",
      dateOfBirth: "",
      characteristics: "angelfish, silver body with black vertical stripes",
      housingUnit: "F12",
      contactInfo: "",
    },
    {
      name: "Shadow",
      species: Species.Dog,
      nickname: "Shad",
      dateOfBirth: "2021-01-01T00:00:00.000Z",
      characteristics: "black labrador, friendly, loves water",
      housingUnit: "D215",
      contactInfo: "phone: 99001122",
    },
    {
      name: "Felix",
      species: Species.Cat,
      nickname: "Fe",
      dateOfBirth: "2020-08-15T00:00:00.000Z",
      characteristics: "tuxedo cat, white paws and chest",
      housingUnit: "H115",
      contactInfo: "email: felix@example.com",
    },
    {
      name: "Ginger",
      species: Species.Rabbit,
      nickname: "Ginj",
      dateOfBirth: "2023-05-19T00:00:00.000Z",
      characteristics: "reddish-brown fur, white belly",
      housingUnit: "R12",
      contactInfo: "phone: 77665544",
    },
    {
      name: "Chirp",
      species: Species.Bird,
      nickname: "Chirpy",
      dateOfBirth: "",
      characteristics: "canary, bright yellow feathers, melodic song",
      housingUnit: "B22",
      contactInfo: "",
    },
    {
      name: "Gator",
      species: Species.Reptile,
      nickname: "Gate",
      dateOfBirth: "2019-10-10T00:00:00.000Z",
      characteristics: "chinese water dragon, bright green with long tail",
      housingUnit: "RE05",
      contactInfo: "email: gator@example.com",
    },
    {
      name: "Nemo",
      species: Species.Fish,
      nickname: "Nem",
      dateOfBirth: "",
      characteristics: "clownfish, bright orange with white stripes",
      housingUnit: "F15",
      contactInfo: "",
    },

  ];

  for (let i = 0; i < seedAnimals.length; i += 8) {
    await db.insert(animals).values(seedAnimals.slice(i, i+8));
  };

  console.log("Seeding finished");
};

export default defineScript(async ({ env }) => {
  await seedData(env);
  return Response.json({ success: true });
});
