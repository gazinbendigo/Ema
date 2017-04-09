/**
 * Created by holly on 30/03/17.
 */

EnvironmentTypes = new Mongo.Collection('EnvironmentTypes');


EnvironmentTypes.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

EnvironmentTypes.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});