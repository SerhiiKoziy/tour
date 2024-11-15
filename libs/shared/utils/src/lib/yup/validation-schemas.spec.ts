import { orderCheckoutSchema, subscribeSchema, orderMyAccountSchema } from './validation-schemas';

describe('Order Checkout Schema', () => {
  it('should validate firstName and LastName', async () => {
    await expect(
      orderCheckoutSchema.validateAt('firstName', {
        firstName: 'Jhon',
        lastName: 'Doe',
      })
    ).resolves.toBe('Jhon');

    await expect(
      orderCheckoutSchema.validateAt('firstName', { firstName: '' })
    ).rejects.toThrowError('form.firstName.required');

    await expect(
      orderCheckoutSchema.validateAt('firstName', {
        firstName: 'Jhon',
        lastName: '',
      })
    ).rejects.toThrowError('form.lastName.required');
  });

  it('should validate email', async () => {
    await expect(
      orderCheckoutSchema.validateAt('email', { email: 'jhon@email.com' })
    ).resolves.toBe('jhon@email.com');

    await expect(
      orderCheckoutSchema.validateAt('email', { email: '' })
    ).rejects.toThrowError('form.required');

    await expect(
      orderCheckoutSchema.validateAt('email', { email: 'jhon' })
    ).rejects.toThrowError('form.email');
  });

  it('should validate phone', async () => {
    await expect(
      orderCheckoutSchema.validateAt('phone', { phone: '123456789' })
    ).resolves.toBe('123456789');

    await expect(
      orderCheckoutSchema.validateAt('phone', { phone: null })
    ).rejects.toThrowError('phone must be a `string`');

    await expect(
      orderCheckoutSchema.validateAt('phone', { phone: 'abcde' })
    ).rejects.toThrowError('form.phone');
  });
});

describe('Subscribe Schema', () => {
  it('should validate email', async () => {
    await expect(
      subscribeSchema.validateAt('email', { email: 'jhon@email.com' })
    ).resolves.toBe('jhon@email.com');

    await expect(
      subscribeSchema.validateAt('email', { email: '' })
    ).rejects.toThrowError('form.required');

    await expect(
      subscribeSchema.validateAt('email', { email: 'jhon' })
    ).rejects.toThrowError('form.email');
  });
});

describe('My Account Schema', () => {
  it('should validate firstName and LastName', async () => {
    await expect(
      orderMyAccountSchema.validateAt('firstName', {
        firstName: 'Jhon',
        lastName: 'Doe',
      })
    ).resolves.toBe('Jhon');

    await expect(
      orderMyAccountSchema.validateAt('firstName', { firstName: '' })
    ).rejects.toThrowError('form.firstName.required');

    await expect(
      orderMyAccountSchema.validateAt('firstName', {
        firstName: 'Jhon',
        lastName: '',
      })
    ).rejects.toThrowError('form.lastName.required');
  });

  it('should validate email', async () => {
    await expect(
      orderMyAccountSchema.validateAt('email', { email: 'jhon@email.com' })
    ).resolves.toBe('jhon@email.com');

    await expect(
      orderMyAccountSchema.validateAt('email', { email: '' })
    ).rejects.toThrowError('form.required');

    await expect(
      orderMyAccountSchema.validateAt('email', { email: 'jhon' })
    ).rejects.toThrowError('form.email');
  });

  it('should validate phone', async () => {
    await expect(
      orderMyAccountSchema.validateAt('phone', { phone: '123456789' })
    ).resolves.toBe('123456789');

    await expect(
      orderMyAccountSchema.validateAt('phone', { phone: null })
    ).rejects.toThrowError('phone must be a `string`');

    await expect(
      orderMyAccountSchema.validateAt('phone', { phone: 'abcde' })
    ).rejects.toThrowError('form.phone');
  });

  it('should validate country', async () => {
    await expect(
      orderMyAccountSchema.validateAt('country', { country: 'Es' })
    ).resolves.toBe('Es');

    await expect(
      orderMyAccountSchema.validateAt('country', { country: '' })
    ).rejects.toThrowError('form.required');
  });
});
