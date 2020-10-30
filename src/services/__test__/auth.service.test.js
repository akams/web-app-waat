import { checkAuthorization } from '../auth.service';

describe('Auth.service', () => {
  it('should return false : user = undefined', () => {
    const user = undefined;
    expect(checkAuthorization(user)).toBe(false);
  });
  it('should return false : user = null', () => {
    const user = undefined;
    expect(checkAuthorization(user)).toBe(false);
  });
  it('should return false : user = false', () => {
    const user = false;
    expect(checkAuthorization(user)).toBe(false);
  });
  it('should return false : user = {}', () => {
    const user = {};
    expect(checkAuthorization(user)).toBe(false);
  });
  it('should return false : user = {a}, allowedRoles = undefined', () => {
    const user = { a: true };
    const allowedRoles = undefined;
    expect(checkAuthorization(user, allowedRoles)).toBe(false);
  });
  it('should return false : user = {a}, allowedRoles = []', () => {
    const user = { a: true };
    const allowedRoles = undefined;
    expect(checkAuthorization(user, allowedRoles)).toBe(false);
  });
  it('should return false all value are empty : user = {}, allowedRoles = []', () => {
    const user = {};
    const allowedRoles = [''];
    expect(checkAuthorization(user, allowedRoles)).toBe(false);
  });
  it('should return false allowedRoles value is empty : user = {guest}, allowedRoles = []', () => {
    const user = { guest: true };
    const allowedRoles = [''];
    expect(checkAuthorization(user, allowedRoles)).toBe(false);
  });
  it('should return false user value "a" doesnt exist : user = {a}, allowedRoles = [guest]', () => {
    const user = { a: true };
    const allowedRoles = ['guest'];
    expect(checkAuthorization(user, allowedRoles)).toBe(false);
  });
  it('should return false user value "guest" doesnt match : user = {guest}, allowedRoles = [admin]', () => {
    const user = { guest: true };
    const allowedRoles = ['admin'];
    expect(checkAuthorization(user, allowedRoles)).toBe(false);
  });
  it('should return false user acl is empty : user = {acl:{}}, allowedRoles = [guest]', () => {
    const user = { acl: {} };
    const allowedRoles = ['guest'];
    expect(checkAuthorization(user, allowedRoles)).toBe(false);
  });
  it('should return false user value "guest" match : user = {guest}, allowedRoles = [guest]', () => {
    const user = { acl: { guest: false } };
    const allowedRoles = ['guest'];
    expect(checkAuthorization(user, allowedRoles)).toBe(false);
  });
  it('should return true user value "guest" match : user = {guest}, allowedRoles = [admin]', () => {
    const user = { acl: { admin: true } };
    const allowedRoles = ['admin'];
    expect(checkAuthorization(user, allowedRoles)).toBe(true);
  });
});
