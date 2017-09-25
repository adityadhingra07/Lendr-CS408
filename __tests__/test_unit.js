export { onFormSubmit } from '../src/containers/post_form'

describe('actions', () => {
    console.log(onFormSubmit)
    it('should create an action to add a todo', () => {

        expect(onFormSubmit()).toEqual("1")
    })
})