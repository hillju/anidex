export interface Vaccine {
  name: string;
  dateAdministered: Date;
  nextDueDate: Date;
}

export interface VetVisit {
  date: Date;
  reason: string;
  notes: string;
}

export interface Pet {
  name: string;
  species: string;
  breed: string;
  birthDate: Date;
  weight: number;
  lastWeighIn: Date;
  vaccines: Vaccine[];
  vetVisits: VetVisit[];
}