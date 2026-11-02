import { fireEvent, render } from '@testing-library/react-native';

import { Button } from '../Button';

describe('Button', () => {
  it('muestra la etiqueta y responde al toque', async () => {
    const onPress = jest.fn();
    const { getByText } = await render(<Button label="Reservar" onPress={onPress} />);

    await fireEvent.press(getByText('Reservar'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('no dispara onPress cuando está deshabilitado', async () => {
    const onPress = jest.fn();
    const { getByRole } = await render(<Button label="Enviar" onPress={onPress} disabled />);

    await fireEvent.press(getByRole('button'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('expone el estado de carga a lectores de pantalla', async () => {
    const { getByRole } = await render(<Button label="Guardando" loading />);

    expect(getByRole('button')).toBeDisabled();
  });
});
