import { v } from "../index";

export const appName = 'FlowTask';

export const DesplegableUser = [
  {
    text: 'Mi perfil',
    icono: v.iconoProfile,
    tipo: 'miperfil'
  },
  {
    text: 'Agregar cuenta',
    icono: v.iconoNuevaCuenta,
    tipo: 'agregarcuenta'
  },
  {
    text: 'Salir',
    icono: v.iconoCerrarSesion,
    tipo: 'salir'
  }
];

export const NoDesplegableUser = [
  {
    text: 'Configuración',
    icono: v.iconoConfiguracion,
    tipo: 'configuracion'
  }
]