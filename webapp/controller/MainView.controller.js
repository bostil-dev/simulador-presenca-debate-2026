sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (
    Controller, 
    JSONModel,
    MessageToast
) => {
    "use strict";

    return Controller.extend("presenca.controller.MainView", {
        _oModel: null,
        _contador: 0,

        onInit() {
            this._oModel = new JSONModel({
                candidatos: [
                    {
                        id: 13,
                        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqkVnxcpQiDoyAQvxBYwzXQfT5_DWfVtUI8D19K_9iJb_xcrGM83aKZdVr&s=10",
                        nome: "Luladrão",
                        partido: "PTralhas",
                        confirmado: false,
                        bloqueado: true
                    },
                    {
                        id: 22,
                        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxZ11qvVohAqN6dgoCwWiQKE23Q0vV2Sh6pHzJ9VALYA&s=10",
                        nome: "Flavio Rachadinha",
                        partido: "Partido do mensaLeiro Valdemar da Costa Neto",
                        confirmado: true,
                        bloqueado: false
                    },
                    {
                        id: 14,
                        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbYZKaU6URi0SGrdmKjIiMHudKkFfaT5PotjmG_7yDAA&s=10",
                        nome: "RENAN SANTOS",
                        partido: "MISSÃO 14",
                        confirmado: false,
                        bloqueado: false
                    }
                ]
            })

            this.getView().setModel(this._oModel)
        },

        onConfirmarPresenca: function(oEvent){
            const bConfirmado = oEvent.getParameters().selected
            const oCandidato = oEvent.getSource().getBindingContext().getObject()
            if(oCandidato.id == 14){
                this._oModel.setProperty("/candidatos/1/confirmado", !bConfirmado)
                this._oModel.setProperty("/candidatos/1/bloqueado", bConfirmado)
                if (bConfirmado) {
                    MessageToast.show("Fudeu! O Renan apareceu. O Flávio fugiu", {
                        at: "CenterCenter"
                    })
                    this._contador++
                    if (this._contador >= 3) {
                        let candidatos = this._oModel.getProperty("/candidatos")
                        candidatos = candidatos.map((candidato) => {
                            candidato.confirmado = false
                            candidato.bloqueado = true
                            return candidato
                        })
                        this._oModel.setProperty("/candidatos", candidatos)
                        MessageToast.show("O Flávio pediu e a Globo desistiu", {
                            at: "CenterCenter"
                        })
                    }
                }

            }   
        }
    });
});