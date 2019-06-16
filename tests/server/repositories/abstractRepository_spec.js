import { expect } from 'chai';

import AbstractRepository from '../../../server/repositories/abstractRepository';

class TestRepository extends AbstractRepository {

}

describe('AbstractRepository', () => {

  // uh kind of testing private methods here...
  // TODO move these methods to a StringHelper utility class as public methods; test there

  describe("#snakeCase", () => {
    it('behaves properly', () => {
      const repo = new TestRepository();

      expect(repo.snakeCase("IAmTheSupervisor")).to.eql("i_am_the_supervisor");
      expect(repo.snakeCase("giveMeYourTaxiNumber")).to.eql("give_me_your_taxi_number");
      expect(repo.snakeCase("EndingThingX")).to.eql("ending_thing_x");
      expect(repo.snakeCase("already_in_good_form")).to.eql("already_in_good_form");
    });
  });

  describe("#camelCase", () => {
    it('behaves properly', () => {
      const repo = new TestRepository();

      expect(repo.camelCase("i_am_the_supervisor")).to.eql("iAmTheSupervisor");
      expect(repo.camelCase("give_me_your_taxi_number")).to.eql("giveMeYourTaxiNumber");
      expect(repo.camelCase("ending_thing_x")).to.eql("endingThingX");
      expect(repo.camelCase("alreadyInGoodForm")).to.eql("alreadyInGoodForm");
    });
  });

  describe("#camelifyObject", () => {
    it('returns a new object where keys have been camelCased', () => {
      const beforeObject = {
        key_with_marks: 123,
        snake_case_is_fun: 345,
        how: "bout_a_value"
      };

      const repo = new TestRepository();
      const afterObject = repo.camelifyObject(beforeObject);

      expect(afterObject.keyWithMarks).to.eql(123);
      expect(afterObject.snakeCaseIsFun).to.eql(345);
      expect(afterObject.how).to.eql("bout_a_value");

      expect('key_with_marks' in afterObject).to.be.false;
      expect('snake_case_is_fun' in afterObject).to.be.false;
    });
  });
});
