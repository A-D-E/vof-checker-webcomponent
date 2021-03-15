# vof-checker-webcomponent
vOffice Domaincheck as Web Component

add on a wish position the custom html tag: 
```
<vof-checker 
            isRaMicro="nein"
            partnerId="1"
            >
            <span slot="label">Wählen Sie einen öffentlichen Namen für Ihr neues <span style="color: rgb(1, 135, 157);">v</span>Office:</span>
            <span slot="feedback">(Dieser Name sollte kurz und prägnant sein. Der <span style="color: rgb(1, 135, 157);">v</span>Office Name ist Bestandteil Ihrer <span style="color: rgb(1, 135, 157);">v</span>Office Internetadresse (URL) und damit auch Bestandteil von Einladungslinks, die an Gäste versandt werden)</span>
            <span slot="button">Prüfen</span>
            <span slot="setup-button">Jetzt einrichten</span>
            <span slot="chip-error">Bereits vergeben</span>
            <span slot="chip-success">Verfügbar</span>
</vof-checker>
```


you kann replace the slot inner texts to customize it. if is a ra-micro page: set isRaMicro="ja" 
partnerId not supported right moment
