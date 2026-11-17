export class Animale {
  constructor(nome, specie, eta, vaccinato = false) {
    this.nome = nome;
    this.specie = specie;
    this.eta = eta;
    this.vaccinato = vaccinato;
    this.dataRegistrazione = new Date();
  }

  // Metodo utile per preparare l'oggetto da salvare su MongoDB
  toDocument() {
    return {
      nome: this.nome,
      specie: this.specie,
      eta: this.eta,
      vaccinato: this.vaccinato,
      dataRegistrazione: this.dataRegistrazione
    };
  }

  descrizione() {
    return `${this.nome} (${this.specie}), ${this.eta} anni - Vaccinato: ${this.vaccinato ? 'Sì' : 'No'}`;
  }
}