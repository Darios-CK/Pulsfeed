// ============================================================
// WISSENSBASIS — PULSFEED
// Trader-orientierte Einschätzungen zu Wirtschaftsdaten, Themen & Krisen.
// Keine Anlageberatung — allgemeine, historisch beobachtete Tendenzen.
// ============================================================

const INDICATOR_KNOWLEDGE = {
  'unemployment': {
    assetClass: 'USD-Paare, US-Staatsanleihen, Zins-sensitive Aktien (Tech, Immobilien, Regionalbanken)',
    higher: 'höher als erwartet → viele Trader lesen das als Abkühlung des Arbeitsmarkts → tendenziell USD-Verkaufsdruck und Anleihen fester, da Zinssenkungs-Erwartungen steigen',
    lower: 'niedriger als erwartet → Trader werten das als robusten Arbeitsmarkt → tendenziell USD-Kaufinteresse, da Zinssenkungs-Erwartungen sinken',
    caveat: 'Erfahrene Trader warten oft den Lohnwachstums-Teil derselben Veröffentlichung ab, bevor sie die Richtung als bestätigt ansehen'
  },
  'non-farm': {
    assetClass: 'USD-Paare, US-Leitindizes (S&P 500, Nasdaq, Dow), Gold',
    higher: 'höher als erwartet → wird am Markt meist als Stärke-Signal gehandelt → USD oft fester, Aktien können kurzfristig unter Druck stehen (weniger Zinssenkungs-Hoffnung)',
    lower: 'niedriger als erwartet → wird oft als Schwäche-Signal gewertet → USD oft schwächer, Aktien können von steigender Zinssenkungs-Hoffnung profitieren',
    caveat: 'Gilt unter Daytradern als einer der volatilsten Releases im Kalender — die erste Kursreaktion dreht sich häufig innerhalb der ersten 5–15 Minuten'
  },
  'interest rate': {
    assetClass: 'Alle Paare der jeweiligen Zentralbankwährung, Staatsanleihen, breite Aktienindizes',
    higher: 'Zinsanhebung oder hawkishe Tonlage → Trader preisen das meist als währungsstützend ein, Aktien und Anleihen geraten häufig unter Druck',
    lower: 'Zinssenkung oder dovishe Tonlage → wird meist als währungsbelastend gehandelt, Aktien und Anleihen profitieren häufig',
    caveat: 'Unter professionellen Tradern gilt: der Wortlaut der Pressekonferenz bewegt oft mehr als die Entscheidung selbst — Schlagwort-Trading auf "hawkish"/"dovish" ist verbreitet'
  },
  'cpi': {
    assetClass: 'Währungspaare, Gold, Staatsanleihen, Zins-sensitive Sektoren',
    higher: 'höher als erwartet → wird als Inflationsdruck gelesen → tendenziell währungsstützend (mehr Zinserhöhungs-Fantasie), Anleihen häufig unter Druck',
    lower: 'niedriger als erwartet → weniger Inflationsdruck → tendenziell währungsbelastend, Anleihen und Wachstumsaktien oft gestützt',
    caveat: 'Die Kernrate (ohne Energie/Lebensmittel) wird von vielen institutionellen Tradern stärker gewichtet als der Headline-Wert'
  },
  'gdp': {
    assetClass: 'Landeswährung, breite Aktienindizes, Rohstoffwährungen (AUD, CAD, NZD)',
    higher: 'höher als erwartet → Wachstumssignal → tendenziell stützend für Währung und Aktien',
    lower: 'niedriger als erwartet → Trader sehen oft Rezessionsrisiko → tendenziell belastend, kann aber gleichzeitig Zinssenkungs-Fantasie auslösen',
    caveat: 'Gilt als nachlaufender Indikator — der Markt hat über Frühindikatoren (PMI etc.) oft schon vorweggenommen, was hier veröffentlicht wird'
  },
  'retail sales': {
    assetClass: 'Landeswährung, Konsum- und Einzelhandelsaktien',
    higher: 'höher als erwartet → starkes Konsumsignal → tendenziell währungsstützend',
    lower: 'niedriger als erwartet → schwaches Konsumsignal → tendenziell währungsbelastend',
    caveat: 'Hohe Volatilität und häufige nachträgliche Revisionen — viele Trader warten die Folgemonate ab, bevor sie dem Wert viel Gewicht geben'
  },
  'pmi': {
    assetClass: 'Landeswährung, Industrie- und Sektor-Aktien',
    higher: 'Wert über 50 und steigend → Expansionssignal → tendenziell stützend für Währung und zyklische Aktien',
    lower: 'Wert unter 50 und fallend → Kontraktionssignal → tendenziell belastend',
    caveat: 'Als Frühindikator wird der PMI von vielen Tradern höher gewichtet als verzögerte Daten wie das BIP'
  },
  'ppi': {
    assetClass: 'Landeswährung, Industrie- und Einzelhandelsaktien (Margenseite)',
    higher: 'höher als erwartet → steigende Einkaufspreise für Unternehmen → gilt vielen Tradern als Frühindikator für CPI, kann Margendruck signalisieren',
    lower: 'niedriger/fallend → sinkende Einkaufspreise → wird teils als margenstützend für Industrie und Einzelhandel gelesen',
    caveat: 'Die Wirkung auf einzelne Aktien hängt davon ab, ob ein Unternehmen Preisänderungen an Kunden weitergeben kann — kein Automatismus'
  },
  'trade balance': {
    assetClass: 'Landeswährung, exportorientierte Sektor-Aktien',
    higher: 'größerer Überschuss als erwartet → tendenziell währungsstützend',
    lower: 'größeres Defizit als erwartet → tendenziell währungsbelastend',
    caveat: 'Wird von den meisten Tradern als nachrangig gegenüber Zins- und Inflationsdaten behandelt'
  },
  'consumer confidence': {
    assetClass: 'Landeswährung, Konsum- und Einzelhandelsaktien',
    higher: 'höher als erwartet → optimistischere Verbraucher → leicht stützend für Konsumwerte',
    lower: 'niedriger als erwartet → pessimistischere Verbraucher → leicht belastend',
    caveat: 'Reiner Stimmungsindikator — Marktreaktion meist deutlich schwächer als bei harten Daten'
  },
  'durable goods': {
    assetClass: 'Landeswährung, Industrie- und Investitionsgüter-Aktien',
    higher: 'höher als erwartet → starkes Investitionssignal → tendenziell stützend für Industriewerte',
    lower: 'niedriger als erwartet → schwaches Investitionssignal → tendenziell belastend',
    caveat: 'Volatile Reihe, oft stark von Einzelaufträgen (z.B. Flugzeugbestellungen) verzerrt'
  },
};

const TOPIC_KNOWLEDGE = [
  { keywords:['fed ','federal reserve','powell','fomc'],
    assetClass:'USD-Paare, US-Staatsanleihen, Nasdaq/S&P 500, Gold',
    tendency:'Aussagen einzelner Fed-Mitglieder bewegen am Markt oft mehr als harte Daten — Trader achten besonders auf die Begriffe "hawkish" und "dovish" im Wortlaut',
    caveat:'Die erste Kursreaktion auf Schlagzeilen dreht sich häufig, sobald der vollständige Wortlaut analysiert ist' },
  { keywords:['ecb','ezb','lagarde'],
    assetClass:'EUR-Paare, europäische Anleihen, europäische Leitindizes (DAX, Euro Stoxx)',
    tendency:'Tonlage der EZB-Pressekonferenz wird ähnlich wie bei der Fed gehandelt — hawkish stützt den Euro, dovish belastet ihn tendenziell',
    caveat:'Divergenzen zwischen einzelnen EZB-Ratsmitgliedern sorgen häufig für widersprüchliche erste Marktreaktionen' },
  { keywords:['bank of japan','boj','ueda'],
    assetClass:'JPY-Paare, japanische Staatsanleihen, Nikkei',
    tendency:'Abweichungen von der ultralockeren Geldpolitik werden von Tradern meist als Yen-stützend gehandelt',
    caveat:'BoJ-Kommunikation gilt als besonders vorsichtig formuliert — Trader interpretieren Nuancen oft unterschiedlich' },
  { keywords:['bank of england','boe'],
    assetClass:'GBP-Paare, britische Anleihen, FTSE 100',
    tendency:'Tonlage wird ähnlich wie bei Fed/EZB gehandelt — hawkish stützt das Pfund, dovish belastet es tendenziell',
    caveat:'Politische Unsicherheit in UK kann geldpolitische Signale überlagern' },
  { keywords:['opec','oil supply','ölförderung','pipeline','crude'],
    assetClass:'Ölpreis (Brent/WTI), Energie-Aktien, Fluggesellschaften (Kostenseite)',
    tendency:'Förderkürzungen werden von Tradern meist als preistreibend gehandelt, Förderausweitungen als preisdrückend',
    caveat:'Die tatsächliche Umsetzung weicht häufig von den Ankündigungen ab — viele Trader warten Folgedaten zur Produktionsmenge ab' },
  { keywords:['natural gas','erdgas','gas storage','gas pipeline'],
    assetClass:'Erdgas-Futures, europäische Energieversorger-Aktien',
    tendency:'Lieferunterbrechungen oder niedrige Speicherstände werden meist als preistreibend gehandelt',
    caveat:'Saisonale Effekte (Winterbedarf) überlagern oft kurzfristige Schlagzeilen' },
  { keywords:['tariff','zoll','zölle','trade war','handelskrieg'],
    assetClass:'Betroffene Sektor-Aktien (Industrie, Tech, Automobil), Landeswährungen der beteiligten Staaten',
    tendency:'Neue Zölle werden meist als belastend für exportabhängige Aktien gehandelt, teils auch für die verhängende Volkswirtschaft selbst',
    caveat:'Verhandlungsdynamik macht den Ausgang oft kurzfristig sehr unsicher — viele Trader warten konkrete Umsetzungstermine ab statt auf Ankündigungen zu reagieren' },
  { keywords:['chip','semiconductor','halbleiter','nvidia','taiwan','tsmc'],
    assetClass:'Tech-/Halbleiter-Aktien, Taiwan-Dollar, breite Tech-Indizes, Nasdaq',
    tendency:'Lieferketten-Störungen oder Exportbeschränkungen werden meist als volatilitätstreibend für den gesamten Sektor gehandelt',
    caveat:'Einzelfirmen können je nach Lieferketten-Position sehr unterschiedlich betroffen sein' },
  { keywords:['recession','rezession','downgrade','default','bankruptcy','insolvenz'],
    assetClass:'Breite Aktienindizes, Risiko-Anlagen allgemein, sichere Häfen (Gold, Staatsanleihen, CHF, JPY)',
    tendency:'Rezessions- oder Ausfallsignale werden meist als belastend für Risiko-Anlagen gehandelt, sichere Häfen profitieren tendenziell',
    caveat:'Märkte preisen solche Risiken häufig schon teilweise vorab ein — die tatsächliche Reaktion fällt dann moderater aus als erwartet' },
  { keywords:['merger','acquisition','übernahme','takeover'],
    assetClass:'Die beteiligten Einzelaktien, teils der gesamte Sektor',
    tendency:'Zielunternehmen steigen bei Übernahmeangeboten meist deutlich (Annäherung an Angebotspreis), übernehmende Firma reagiert uneinheitlich',
    caveat:'Deals können an Kartellbehörden scheitern — Spread zwischen Kurs und Angebotspreis spiegelt diese Unsicherheit' },
  { keywords:['ipo','börsengang'],
    assetClass:'Die jeweilige Neuemission, teils Sektor-Sentiment',
    tendency:'Hohe Zeichnungsnachfrage wird meist als positives Sentiment-Signal für den Sektor gelesen',
    caveat:'Erste Handelstage gelten als besonders volatil und wenig aussagekräftig für die langfristige Bewertung' },
  { keywords:['etf','exchange traded fund'],
    assetClass:'Der jeweilige zugrunde liegende Sektor/Index',
    tendency:'Starke ETF-Zuflüsse gelten als breites Sentiment-Signal für den abgebildeten Sektor',
    caveat:'Kann Einzeltitel-Bewegungen überdecken, die fundamental anders begründet sind' },
  { keywords:['bitcoin','btc','crypto regulation','sec crypto'],
    assetClass:'Bitcoin, breiter Krypto-Markt, Krypto-nahe Aktien (Coinbase, MicroStrategy)',
    tendency:'Regulatorische Erleichterungen werden meist als preistreibend gehandelt, Verschärfungen als belastend',
    caveat:'Krypto-Markt gilt als besonders sentiment-getrieben — Nachrichtenreaktionen fallen oft überproportional stark aus' },
  { keywords:['etf bitcoin','spot etf','crypto etf'],
    assetClass:'Bitcoin, Ethereum, Krypto-Markt allgemein',
    tendency:'Genehmigungen neuer Krypto-ETFs werden meist als institutioneller Akzeptanz-Schub gehandelt, tendenziell preistreibend',
    caveat:'Reine Genehmigung garantiert keine nachhaltigen Mittelzuflüsse — Marktreaktion oft kurzfristiger als erwartet' },
  { keywords:['retail earnings','consumer spending','black friday','holiday sales'],
    assetClass:'Einzelhandels- und Konsumgüter-Aktien',
    tendency:'Starke Konsumdaten werden meist als sektorstützend gehandelt',
    caveat:'Einzelne Unternehmenszahlen können stark von der Branchenentwicklung abweichen' },
  { keywords:['housing','immobilien','mortgage','hypothek','home sales'],
    assetClass:'Immobilien-Aktien (REITs), Baustoff-Hersteller, Hypothekenbanken',
    tendency:'Steigende Zinsen werden meist als belastend für den Immobiliensektor gehandelt, fallende Zinsen als stützend',
    caveat:'Regionale Unterschiede können nationale Durchschnittsdaten verzerren' },
];

const CRISIS_WATCH = [
  { keywords:['iran','israel','houthi','red sea','strait of hormuz'],
    assetClass:'Ölpreis (Brent/WTI), Gold, Energie-Aktien, Airline- und Logistik-Aktien, sichere Häfen (CHF, JPY)',
    tendency:'Eskalationen am Persischen Golf werden von Tradern traditionell mit Öl- und Goldkäufen gehandelt, da die Region für einen großen Teil der globalen Ölförderung und -transportwege steht',
    caveat:'Viele Ankündigungen führen nicht zu tatsächlichen Lieferunterbrechungen — Trader unterscheiden zwischen Rhetorik und realer Förder-/Transportwirkung' },
  { keywords:['gaza','middle east','nahost'],
    assetClass:'Ölpreis, Gold, regionale Aktienindizes, sichere Häfen',
    tendency:'Regionale Eskalationen im Nahen Osten lösen historisch kurzfristige Risikoaversion aus (Verkauf von Risiko-Anlagen, Kauf sicherer Häfen)',
    caveat:'Marktwirkung bleibt häufig auf wenige Handelstage begrenzt, sofern keine Eskalation auf weitere Länder erfolgt' },
  { keywords:['ukraine','russia','russland'],
    assetClass:'Energiepreise (Gas, Öl), europäische Leitindizes, Rubel, sichere Häfen, Rüstungs-Aktien',
    tendency:'Eskalationsschritte werden meist mit Energiepreis-Anstiegen und Druck auf europäische Aktienindizes gehandelt, Rüstungswerte oft gegenläufig fester',
    caveat:'Der Markt hat sich seit Kriegsbeginn an viele Schlagzeilen gewöhnt — die Reaktionsstärke variiert stark je nach Neuigkeitsgehalt' },
  { keywords:['taiwan','china','xi jinping'],
    assetClass:'Halbleiter-Aktien (insbesondere TSMC-Lieferkette), Taiwan-Dollar, breite Tech-Indizes, chinesische Aktienindizes',
    tendency:'Eskalation der Taiwan-Frage wird von Tradern als Risiko für globale Chip-Lieferketten gehandelt — Tech-Sektor reagiert meist überproportional',
    caveat:'Viele Marktteilnehmer halten eine kurzfristige militärische Eskalation für unwahrscheinlich, was die Marktreaktion auf reine Rhetorik oft dämpft' },
  { keywords:['north korea','nordkorea','kim jong'],
    assetClass:'Südkoreanischer Won, asiatische Leitindizes, Gold',
    tendency:'Raketentests oder Drohungen lösen meist kurzfristige, schnell abklingende Risikoaversion in der Region aus',
    caveat:'Historisch meist ohne nachhaltige Marktwirkung, sofern keine direkte militärische Aktion folgt' },
];
