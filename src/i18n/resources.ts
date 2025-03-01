import { i18n as I18nType } from 'i18next';

export const getQueryLanguage = () => {
  const params = new URLSearchParams(window.location.search);

  return params.get('lang') || 'en';
};

export const addResources = (lng: string, translations: Record<string, string>, i18n: I18nType) => {
  i18n.addResourceBundle(lng, 'translation', translations, true, true);
};

type Translations = {
  [key: string]: {
    translation: Record<string, string>;
  };
};

export const resources = {
  en: {
    translation: {
      sizing_id: 'Sizing Id',
      config_id: 'Config Id',
      view_panel:
        'Click "View Drawing" to generate and immediately view the drawing for the selected tag and provided information.',
      view_panel_conformation:
        'The following is the information that was provided in the last step and which will appear in any drawings that are viewed or exported. Please do one final check to ensure that everything is correct as it has been entered.',
      export_panel:
        'Click "Get Available Views" to begin the process of exporting the drawing to a file. We will need to select both a view and a format in order to export.',
      view_button: 'View Drawing',
      get_views: 'Get Available Views',
      export_file_button: 'Export Drawing',
      view_drawing_3d:
        'Unable to load the 3D in the same window. Please click on the below button to View in a new window.',
    },
  },
};

export const otherLanguages: Translations = {
  es: {
    translation: {
      sizing_id: 'Id de Tamaño',
      config_id: 'Id de Configuración',
      view_panel:
        'Haga clic en "Ver Dibujo" para generar y ver inmediatamente el dibujo para la etiqueta seleccionada y la información proporcionada.',
      view_panel_conformation:
        'La siguiente es la información que se proporcionó en el último paso y que aparecerá en cualquier dibujo que se vea o exporte. Por favor, haga una última verificación para asegurarse de que todo sea correcto como se ha ingresado.',
      export_panel:
        'Haga clic en "Obtener Vistas Disponibles" para comenzar el proceso de exportación del dibujo a un archivo. Necesitaremos seleccionar tanto una vista como un formato para exportar.',
      view_button: 'Ver Dibujo',
      get_views: 'Obtener Vistas Disponibles',
      export_file_button: 'Exportar Dibujo',
      view_drawing_3d:
        'No se puede cargar el 3D en la misma ventana. Por favor, haga clic en el botón de abajo para ver en una nueva ventana.',
    },
  },

  fr: {
    translation: {
      sizing_id: 'Id de Taille',
      config_id: 'Id de Configuration',
      view_panel:
        'Cliquez sur "Voir le Dessin" pour générer et voir immédiatement le dessin pour l\'étiquette sélectionnée et les informations fournies.',
      view_panel_conformation:
        "Voici les informations fournies à l'étape précédente et qui apparaîtront dans tous les dessins visualisés ou exportés. Veuillez effectuer une dernière vérification pour vous assurer que tout est correct tel qu'il a été saisi.",
      export_panel:
        'Cliquez sur "Obtenir les Vues Disponibles" pour commencer le processus d\'exportation du dessin vers un fichier. Nous devrons sélectionner à la fois une vue et un format pour exporter.',
      view_button: 'Voir le Dessin',
      get_views: 'Obtenir les Vues Disponibles',
      export_file_button: 'Exporter le Dessin',
      view_drawing_3d:
        'Impossible de charger le 3D dans la même fenêtre. Veuillez cliquer sur le bouton ci-dessous pour voir dans une nouvelle fenêtre.',
    },
  },
};
