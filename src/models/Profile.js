import { Model } from '@nozbe/watermelondb'
import { field, action } from '@nozbe/watermelondb/decorators'

export default class Profile extends Model {
  static table = 'profile'

    @field('name')
    name

    @field('contact')
    contact

    @field('property')
    property

    @field('location')
    location

    @field('adress')
    adress

    @field('zip')
    zip

    @action async addProfile(name, contact, property, location, adress, zip) {
        return await this.create(Profile => {
            Profile.name = name
            Profile.contact = contact
            Profile.property = property
            Profile.location = location
            Profile.adress = adress
            Profile.zip = zip
        })
    }

}