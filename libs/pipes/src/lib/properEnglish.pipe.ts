import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fsProperEnglish'
})
export class FLXProperEnglishPipe implements PipeTransform {
  public transform(input: string): string {
    if (!input) {
      return '';
    } else {
      let newString = input.replace(/-|_/gi, ' ');

      switch (newString) {
        case 'voluntaryexcess':
          newString = 'voluntary excess';
          break;
        case 'dontpingsp':
          newString = "don't ping sp";
          break;
        case 'areacode':
          newString = 'area code';
          break;
        case 'addressconfirmation':
          newString = 'address confirmation';
          break;
        case 'onsitecontact':
          newString = 'onsite contact';
          break;
        case 'dateofloss':
          newString = 'date of loss';
          break;
        case 'propertycomplex':
          newString = 'property complex';
          break;
        case 'handleremail':
          newString = 'handler email';
          break;
        case 'mavenclearancecode':
          newString = 'maven clearance code';
          break;
        case 'claimtype':
          newString = 'claim type';
          break;
        case 'claimtype id':
          newString = 'claim type id';
          break;
        case 'additionalexcess':
          newString = 'additional excess';
          break;
        case 'contactnumber':
          newString = 'contact number';
          break;
        case 'mavenclaimnumber':
          newString = 'maven claim number';
          break;
        case 'onsiteperson':
          newString = 'onsite person';
          break;
        case 'onsitenotes':
          newString = 'onsite notes';
          break;
        case 'whatmatters':
          newString = 'what matters';
          break;
        case 'propertycity':
          newString = 'property city';
          break;
        case 'specialclause':
          newString = 'special clause';
          break;
        case 'preferedcommethod':
          newString = 'preferred com method';
          break;
        case 'isjointaccount':
          newString = 'is joint account';
          break;
        case 'claimlatitude':
          newString = 'claim latitude';
          break;
        case 'claimlongitude':
          newString = 'claim longitude';
          break;
        case 'handlercontact':
          newString = 'handler contact';
          break;
        case 'clientcode':
          newString = 'client code';
          break;
        case 'claimdescription':
          newString = 'claim description';
          break;
        case 'suminsured':
          newString = 'sum insured';
          break;
        case 'cellnumber':
          newString = 'cell number';
          break;
        case 'suburbcode':
          newString = 'suburb code';
          break;
        case 'propertystreetaddress':
          newString = 'property street address';
          break;
        case 'reinsuranceexcess':
          newString = 'reinsurance excess';
          break;
        case 'propertysuburb':
          newString = 'property suburb';
          break;
        case 'claimantpoliceynum':
          newString = 'claimant policy number';
          break;
        case 'bondnumber':
          newString = 'bond number';
          break;
        case 'requestedappointmenttime':
          newString = 'requested appointment time';
          break;
        case 'requestedappointmentdate':
          newString = 'requested appointment date';
          break;
        case 'requiredvendortype':
          newString = 'required vendor type';
          break;
        case 'appointmentdatetype':
          newString = 'appointment date type';
          break;
        case 'claimprovince':
          newString = 'claim province';
          break;
        case 'policecasenumber':
          newString = 'police case number';
          break;
        case 'skillrequested':
          newString = 'skill requested';
          break;
        case 'providertype':
          newString = 'provider type';
          break;
        case 'providertype id':
          newString = 'Provider type ID';
          break;
        case 'skillcatagory':
          newString = 'Skill Category';
          break;
        case 'skillcatagory id':
          newString = 'Skill Category ID';
          break;
      }

      return newString.replace(/\w\S*/g, txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase());
    }
  }
}
