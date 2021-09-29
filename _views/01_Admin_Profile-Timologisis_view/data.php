<?php
$label = [
    "Αριθμός Προφίλ",
    "Κατάσταση",
    "Ενημερώθηκε στις",
    
];
$labelval = ["500218", "ΕΝΕΡΓΟ", "16/04/2023"];

$colorClass = ["","success",""];

$nservers = [
    [
        "group" => "Θα δηλώσω νέους εξυπηρετητές",
        "option" => [
            [
                "name" => "Εισαγωγή νέων εξυπηρετητών",
                "value" => "nons",
            ],
        ],
    ],
    [
        "group" => "Θα δηλώσω εξυπηρετητές της DNHOST",
        "option" => [
            [
                "name" => "DNHOST nameservers",
                "value" => "4",
            ],
        ],
    ],
    [
        "group" => "Nameserver groups",
        "option" => [
            [
                "name" => "pantazistestdns",
                "value" => "305",
            ],
            [
                "name" => "nsgroup1",
                "value" => "419",
            ],
            [
                "name" => "adffggg9246hhrrrgfggjkjhhjkhgfjdkdfk1",
                "value" => "547",
            ],
            [
                "name" => "aaaaaa",
                "value" => "564",
            ],
            [
                "name" => "ns1.pantazis.comss",
                "value" => "593",
            ],
            [
                "name" => "aaaaaaaaaaaaaaaaaaaaaaaaa",
                "value" => "594",
            ],
            [
                "name" => "asaasadsdss",
                "value" => "829",
            ],
            [
                "name" => "jfdjhdfkjhfdkhgsdhkgfdg",
                "value" => "830",
            ],
        ],
    ],
];

function buttonBottom($text=" ")
{
    return '<div class="addAction"><span class="icon-fi-sr-plus-small" alt=""></span>'.$text.'</div>';
}

function HtmlEl($text, $classl, $color, $element, $icon = false)
{
    if ($element == "") {
        $element = "span";
    }

    $template = "";
    $iconTemplate = '<div class="icon-cont"> <div class="info-icon action1">
  <span class="icon-fi-sr-pencil" class="button-icon" alt=""></span>
  </div></div>';

    if (is_array($icon)) {
        $template .=
            "<" .
            $element .
            " class='" .
            $classl .
            " " .
            $color .
            "'>" .
            $text .
            "</" .
            $element .
            ">";
            $template.='<div class="icon-cont">';

        foreach ($icon as $key => $val) {
            $template .=
                '<div class="info-icon action' .
                $key .
                '"><span class="' .
                $val .
                '" class="button-icon" alt=""></span></div>';
               
        }
        $template.='</div>';
    }

    if ($icon == true && !is_array($icon)) {
        $template =
            "<" .
            $element .
            " class='" .
            $classl .
            " " .
            $color .
            "'>" .
            $text .
            "</" .
            $element .
            ">" .
            $iconTemplate;
    }
    if ($icon == false && !is_array($icon)) {
        $template =
            "<" .
            $element .
            " class='" .
            $classl .
            " " .
            $color .
            "'>" .
            $text .
            "</" .
            $element .
            ">";
    }

    return $template;
}
$elDate =  HtmlEl("ΔΙΑΜΑΝΤΗΣ ΣΤΥΛΙΑΝΟΣ ΒΑΣΙΛΕΙΟΣ", "date", "", "");;
$eldomain = HtmlEl("antoineeurtest.gr", "date", "", "");
$eltimezone = HtmlEl("(Europe/Athens)", "timezone", "", "");
$elbutton = HtmlEl("Συγχρονισμός Τώρα", "timezone", "", "a");
$elnserver = HtmlEl(".antoineeurtest.gr", "date", "ice", "");
$ellink = HtmlEl("300127 - CITIZEN", "date", "blue", "a");
$vies ="<div>countryCode: DE</div>
<div>vatNumber: 812871812</div>
<div>requestDate: 2019-05-13+02:00</div>
<div>valid: true</div>
<div>name: ---</div>
<div>address: ---</div>";
$address="<div>Falkenstr. 5,</div>
<div>GeorgsmarienhÜTte,</div>
<div>49124,</div>
<div>Germany</div>";

$valueArr = [
    [
        [HtmlEl("ΔΙΑΜΑΝΤΗΣ ΣΤΥΛΙΑΝΟΣ ΒΑΣΙΛΕΙΟΣ", "date", "","", true) ],
        [HtmlEl("-", "date", "","", true) ],
       
    ],
    [
        [HtmlEl("DE812871812", "date", "", "", false) ],
        [HtmlEl("ΕΓΚΕΚΡΙΜΕΝΟ", "date", "green2", "", false), HtmlEl("Επανέλεγχος", "button", "", "a")],
        [HtmlEl("ΣΕ ΑΝΑΜΟΝΗ", "date", "orange2", "", true)],
        [HtmlEl($vies, "date", "blue", "", false)],
        [HtmlEl("-", "date", "", "", true)],
        
        
       
    ],
    [ 
      [
        HtmlEl($address, "date", "", "",true),
     
      ]      
       
    ],
    [
        [HtmlEl("-", "date", "", "")],
        [checkbox("off", "on")],
        [checkbox("off", "on")],       
       
       
    ],
];

$formArr = [
    ["", ""],
    [
        selectEl(
            [
                "300146 ‐ Κωνσταντίνος Χριστόπουλος",
                "300134 ‐ pantazis vastardis",
            ],
            "Κάτοχος"
        ),
        selectEl(
            [
                "300146 ‐ Κωνσταντίνος Χριστόπουλος",
                "300134 ‐ pantazis vastardis",
            ],
            "Κάτοχος"
        ),
        selectEl(
            [
                "300146 ‐ Κωνσταντίνος Χριστόπουλος",
                "300134 ‐ pantazis vastardis",
            ],
            "Κάτοχος"
        ),
        selectEl(
            [
                "300146 ‐ Κωνσταντίνος Χριστόπουλος",
                "300134 ‐ pantazis vastardis",
            ],
            "Κάτοχος"
        ),

      
    ],
    [formPersonal($host,$domain,$ip),formPersonal($host,$domain,$ip), formPersonal($host,$domain,$ip)],
    [
        select2($nservers, "pant"),
        formPersonal2($host),
        formPersonal2($host),
        formPersonal2($host),
        formPersonal2($host)
      
    ],
];



$domaininfo = [
    [
        "title" => "Πληροφορίες επιχείρησης",
        "text" => [
            "Επωνυμία :",
            "Διακριτικός τίτλος :",
            
        ],
    ],
    [
        "title" => "Πληροφορίες ΑΦΜ",
        "text" => [
            "ΑΦΜ :",
            "Κατάσταση ΑΦΜ :",
            "Αφαίρεση ΦΠΑ :",
            "Απάντηση απο VIES :",
            "Δραστηριότητα :",
          
            
        ],
    ],
    [
        "title" => "Πληροφορίες διεύθυνσης",
        "text" => ["Διεύθυνση :"],
    ],
    [
        "title" => "Προτιμήσεις",
        "text" => [
            "Κωδικός ERP :",
            "Κατάσταση Προφίλ τιμολόγησης :",
            "Χρήση ως προεπιλεγμένου :",
      
        ],
    ],
];

$page_title = "Hetzner";

$breadcrumb = ["Dashboard ", "Users", "An Ubavicius", "Προφίλ Τιμολόγησης"];


$tabs = [["name" => "Στοιχεία προσώπου"]];
?>
