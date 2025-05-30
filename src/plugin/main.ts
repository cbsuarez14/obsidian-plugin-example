import { Plugin } from "obsidian";
import { LabelModal } from "../view/view"; // Importamos el modal personalizado
import { PDFburnSettingsTab } from "../settings/SettingsTab";
import { Settings, DEFAULT_SETTINGS } from "../view/viewData";

export default class PDFBurn extends Plugin {
	
	settings: Settings;

	async onload() {

		await this.loadSettings();
				
		this.app.workspace.onLayoutReady(() => {
			const pdfplus = (this.app as any).plugins.plugins["pdf-plus"];
	
			if (!pdfplus) {
				console.warn("PDF++ no está cargado");
				return;
			}
			console.log("PDF++ cargado correctamente");
			
			// Icono en la barra lateral
			this.addRibbonIcon("notebook-pen", "Abrir configuración", () => {
				new LabelModal(this.app, this, pdfplus).open();
			});

			

			// Comando para abrir el modal
			this.addCommand({
				id: "open-label-modal",
				name: "Exportar anotaciones a PDF",
				callback: () => {
					new LabelModal(this.app, this, pdfplus).open();
				}
			});

			this.addSettingTab(new PDFburnSettingsTab(this.app, this));
		});
	}
	
	// Método para guardar ajustes
	async saveSettings() {
		await this.saveData(this.settings);
	}

	// Metodo para cargar los ajustes
	async loadSettings() {
		// Ignorar ajustes guardados → siempre usar los valores por defecto
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}


	onunload() {
		console.log("Plugin descargado.");
	}
}
