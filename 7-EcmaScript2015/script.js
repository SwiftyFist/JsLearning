function SmithPerson(parameters) {
    let {firstName, yearOfBirth, lastName = 'Smith', nationality = 'american'} = parameters;
    this.firstNAme = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}