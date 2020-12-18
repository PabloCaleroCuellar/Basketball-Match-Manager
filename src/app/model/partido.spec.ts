import { Partido } from './partido';

describe('Partido', () => {
  it('should create an instance', () => {
    expect(new Partido("nombre local", "nombre visitante", 2, 10, 20, 16)).toBeTruthy();
  });
});
