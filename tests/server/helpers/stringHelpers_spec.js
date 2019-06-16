import { expect } from 'chai';

import StringHelpers from '../../../server/helpers/stringHelpers';

describe("StringHelpers", () => {
  describe("#snakeCase", () => {
    it('behaves properly', () => {
      expect(StringHelpers.snakeCase("IAmTheSupervisor")).to.eql("i_am_the_supervisor");
      expect(StringHelpers.snakeCase("giveMeYourTaxiNumber")).to.eql("give_me_your_taxi_number");
      expect(StringHelpers.snakeCase("EndingThingX")).to.eql("ending_thing_x");
      expect(StringHelpers.snakeCase("already_in_good_form")).to.eql("already_in_good_form");
    });
  });

  describe("#camelCase", () => {
    it('behaves properly', () => {
      expect(StringHelpers.camelCase("i_am_the_supervisor")).to.eql("iAmTheSupervisor");
      expect(StringHelpers.camelCase("give_me_your_taxi_number")).to.eql("giveMeYourTaxiNumber");
      expect(StringHelpers.camelCase("ending_thing_x")).to.eql("endingThingX");
      expect(StringHelpers.camelCase("alreadyInGoodForm")).to.eql("alreadyInGoodForm");
    });
  });

  describe("#camelifyObject", () => {
    it('returns a new object where keys have been camelCased', () => {
      const beforeObject = {
        key_with_marks: 123,
        snake_case_is_fun: 345,
        how: "bout_a_value"
      };

      const afterObject = StringHelpers.camelifyObject(beforeObject);

      expect(afterObject.keyWithMarks).to.eql(123);
      expect(afterObject.snakeCaseIsFun).to.eql(345);
      expect(afterObject.how).to.eql("bout_a_value");

      expect('key_with_marks' in afterObject).to.be.false;
      expect('snake_case_is_fun' in afterObject).to.be.false;
    });
  });
});
