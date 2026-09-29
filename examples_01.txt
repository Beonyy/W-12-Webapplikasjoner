// Forslag til datatyper og tiltenkt bruk/backend API (ikke rest, altså)

// frontend
type Animal = {
    name : string;
    kind: string;
    nickname: string;
    dateOfBirth : Date;
    traits: string;
    housingUnit : string;
    contactInfo: string;
    bilder: Image[];
    // more here, maybe
}

// backend, ex:
type AnimalDB = {
    name : string;
    kind: string;
    nickname: string;
    dateOfBirth : number;
    traits: string;
    housingUnit : number;
    contactInfo: string;
}

type AnimalIMGs = {
    bilder: Image[]
}

// kalles fra frontend, utføres på backend
function insertAnimal(animal:Animal){
    // or something...
    const {animalDB, animalImgs, ...} = validateAnimal(animal);
    database.insertAnimal(animalDB)
    database.insertImages(animalImgs)
}

function getAnimal(id:AnimalID): Animal {
}

type HousingCoop = {
    id:String

}

type HousingUnit = {
    id:string;
    name:string;
    contactPerson:string;
    housingCoop:string;
}

type User = {
    id:string;
    email:string;
    password:string;
    name:string;
    housingUnit:string;

}

type UserDB = {
    id:string;
    email:string;
    password:string;
    name:string;
    housingUnit:string;
}

type Admin = {
    id:string;
    email:string;
    password:string;
    name:string;
    housingCoop:string;
}

type SuperAdmin = {
    id:string;
    email:string;
    password:string;
    name:string;
}


