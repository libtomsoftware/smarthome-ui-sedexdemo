import ValidationService from "./validator.js";

const invalidEmailAddresses = [null, true, false, 100, '', 'tomasz', 'tomasz@', 'tomasz@tomasz', '@'];
const invalidPhoneNumbers = [null, true, false, '', 'no 12345', 'phone 123456', '0-823-9992-2222'];
const tooShortStrings = ['', 'a', 1234567890];

let emailAddress;
let phoneNumber;
let stringToTest;

describe('Validator', () => {

    describe('isValidEmail', () => {

        describe('When an ivalid email address has been provided', () => {
            invalidEmailAddresses.forEach(address => {
                describe(`And the email address is ${address}`, () => {
                    beforeEach(() => {
                        emailAddress = address;
                    });

                    it('should confirm it is NOT a valid email address', () => {
                        expect(ValidationService.isValidEmail(emailAddress)).toBe(false);
                    });
                });
            });

        });

        describe('When a valid email address has been provided', () => {
            beforeEach(() => {
                emailAddress = 'tomasz@tomasz.com';
            });

            it('should confirm it is a valid email address', () => {
                expect(ValidationService.isValidEmail(emailAddress)).toBe(true);
            });
        });
    });

    describe('isValidPhone', () => {

        describe('When an ivalid phone number has been provided', () => {
            invalidPhoneNumbers.forEach(number => {
                describe(`And the phone number is ${number}`, () => {
                    beforeEach(() => {
                        phoneNumber = number;
                    });

                    it('should confirm it is NOT a valid phone number', () => {
                        expect(ValidationService.isValidPhone(phoneNumber)).toBe(false);
                    });
                });
            });

        });

        describe('When a valid phone number has been provided', () => {
            beforeEach(() => {
                phoneNumber = 1234567890;
            });

            it('should confirm it is a valid phone number', () => {
                expect(ValidationService.isValidPhone(phoneNumber)).toBe(true);
            });
        });
    });

    describe('isLongEnough', () => {

        describe('When too short string has been provided', () => {
            tooShortStrings.forEach(item => {
                describe(`And the string is ${item}`, () => {
                    beforeEach(() => {
                        stringToTest = item;
                    });

                    it('should confirm the string is too short', () => {
                        expect(ValidationService.isLongEnough(stringToTest)).toBe(false);
                    });
                });
            });

        });

        describe('When a valid string has been provided', () => {
            beforeEach(() => {
                stringToTest = 'abc';
            });

            it('should confirm it is a valid, long enough string', () => {
                expect(ValidationService.isLongEnough(stringToTest)).toBe(true);
            });
        });
    });
});