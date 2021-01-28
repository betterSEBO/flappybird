var cvs = document.getElementById("myCanvas");
var ctx = cvs.getContext("2d");

//Variablen für Spielschwierigkeit
    //Hier kann man sich das Spiel beliebig schwerer als auch leichter machen
    var gravity=1.2;
    var gap =90;
    var Geschwindigkeit= 2;


//Variablen für Spieler
    var PlayerX=50;
    var PlayerY=200;
    var PlayerBreite=20;
    var PlayerHoehe=20;

//Variablen für Hindernisse
    var Hindernisse =[];
    var HindernissX=300;
    var HindernissY=120;
    var HindernisshoeheOben=170;
    var Hindernissunten = HindernisshoeheOben+gap;
    var OberesHindernissBreite=10;
    var UnteresHindernissBreite=10;
    var HindernisshoeheUnten=240;

//Variable für Grassfläche
    var GrassflaecheHoehe = 10;

//Variable für Punkte
    var Punkte = 0;

/*-----------------------------------------------------------------------------------------------*/

//Spieler bewegen
    var c = document.getElementById("myCanvas");
    document.addEventListener("keydown", keyspace);

    function keyspace() {
        PlayerY-=25;    
    }

//x und y Koordinaten definieren
    Hindernisse[0] ={
        x:cvs.width,
        y:0
    };


//Spiel Gegenstände zeichnen
    function drawAll(){
        var ele = document.getElementById("myCanvas");
        var ctx = ele.getContext("2d");
        
        //Clear everything
        ele.width =ele.width;

        //Grassfläche zeichnen
        ctx.fillStyle="green";
        ctx.fillRect (0, 260, 480, GrassflaecheHoehe);
        
        //Spieler zeichnen
        ctx.fillStyle = "yellow";
        ctx.fillRect (PlayerX, PlayerY, PlayerHoehe, PlayerBreite);

        /*Gravitation Spieler*/ PlayerY+=gravity;

        //Hindernisse zeichnen
        for (var i=0; i<Hindernisse.length; i++){
            ctx.fillStyle="blue";
            ctx.fillRect (Hindernisse[i].x, Hindernisse[i].y, OberesHindernissBreite, HindernisshoeheOben);

            ctx,fillStyle="blue";
            ctx.fillRect (Hindernisse[i].x, Hindernisse[i].y+Hindernissunten, UnteresHindernissBreite, HindernisshoeheUnten);

            Hindernisse[i].x-=Geschwindigkeit;  //Geschwindigkeit der Hindernisse kann oben bei den Variablen geändert werden. Man kan sozusagen die Schwierigkeit erhöhen.

            if(Hindernisse[i].x == 350){
                Hindernisse.push({
                    x : cvs.width,
                    y : Math.floor(Math.random()*HindernisshoeheOben)-
                    HindernisshoeheOben
                });
            }

            //Bei Kollision vorbei
            if(PlayerX + PlayerBreite >= Hindernisse[i].x && PlayerX <= Hindernisse[i].x + OberesHindernissBreite
                && (PlayerY <= Hindernisse[i].y + HindernisshoeheOben || PlayerY+PlayerHoehe >=Hindernisse[i].y+Hindernissunten)
                ||PlayerY + PlayerHoehe >= cvs.height - GrassflaecheHoehe){
                location.reload(); //Seite wird neu geladen wenn eine Kollision passiert
            }
            //Wenn Hinderniss geschaft Punkte +1
            if (Hindernisse[i].x==50){
                Punkte++;
            }
        }

        //Punkte anzeigen
        ctx.fillStyle = "Black   ";
        ctx.font = "20px Arial"
        ctx.fillText(Punkte+" Punkte",10, 20)


        requestAnimationFrame(drawAll);
}   

    

//Spiel starten bzw Funktion drawAll aufrufen
    drawAll();
