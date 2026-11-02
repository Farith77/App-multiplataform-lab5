import { formatDistance, formatKg, formatPortions, hoursUntil, initials } from '../format';

describe('format', () => {
  it('formatea kilogramos sin decimales innecesarios', () => {
    expect(formatKg(6)).toBe('6 kg');
    expect(formatKg(4.5)).toBe('4.5 kg');
  });

  it('pluraliza porciones correctamente', () => {
    expect(formatPortions(1)).toBe('1 porción');
    expect(formatPortions(25)).toBe('25 porciones');
  });

  it('convierte metros a metros o kilómetros', () => {
    expect(formatDistance(450)).toBe('450 m');
    expect(formatDistance(2300)).toBe('2.3 km');
  });

  it('calcula horas restantes frente a una fecha de referencia', () => {
    const now = new Date('2026-10-21T18:00:00-05:00');
    expect(hoursUntil('2026-10-21T21:00:00-05:00', now)).toBe(3);
    expect(hoursUntil('2026-10-21T17:00:00-05:00', now)).toBe(-1);
  });

  it('obtiene las iniciales del nombre', () => {
    expect(initials('Ana Quispe')).toBe('AQ');
  });
});
