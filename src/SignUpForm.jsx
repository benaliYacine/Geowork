import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import { Check, Eye, EyeOff, ChevronsUpDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const wilayas = [
  {
    label: "Adrar",
    value: "adrar",
  },
  {
    label: "Chlef",
    value: "chlef",
  },
  {
    label: "Laghouat",
    value: "laghouat",
  },
  {
    label: "Oum El Bouaghi",
    value: "oum_el_bouaghi",
  },
  {
    label: "Batna",
    value: "batna",
  },
  {
    label: "B\u00e9ja\u00efa",
    value: "b\u00e9ja\u00efa",
  },
  {
    label: "Biskra",
    value: "biskra",
  },
  {
    label: "B\u00e9char",
    value: "b\u00e9char",
  },
  {
    label: "Blida",
    value: "blida",
  },
  {
    label: "Bouira",
    value: "bouira",
  },
  {
    label: "Tamanrasset",
    value: "tamanrasset",
  },
  {
    label: "T\u00e9bessa",
    value: "t\u00e9bessa",
  },
  {
    label: "Tlemcen",
    value: "tlemcen",
  },
  {
    label: "Tiaret",
    value: "tiaret",
  },
  {
    label: "Tizi Ouzou",
    value: "tizi_ouzou",
  },
  {
    label: "Alger",
    value: "alger",
  },
  {
    label: "Djelfa",
    value: "djelfa",
  },
  {
    label: "Jijel",
    value: "jijel",
  },
  {
    label: "S\u00e9tif",
    value: "s\u00e9tif",
  },
  {
    label: "Sa\u00efda",
    value: "sa\u00efda",
  },
  {
    label: "Skikda",
    value: "skikda",
  },
  {
    label: "Sidi Bel Abb\u00e8s",
    value: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Annaba",
    value: "annaba",
  },
  {
    label: "Guelma",
    value: "guelma",
  },
  {
    label: "Constantine",
    value: "constantine",
  },
  {
    label: "M\u00e9d\u00e9a",
    value: "m\u00e9d\u00e9a",
  },
  {
    label: "Mostaganem",
    value: "mostaganem",
  },
  {
    label: "M'Sila",
    value: "m'sila",
  },
  {
    label: "Mascara",
    value: "mascara",
  },
  {
    label: "Ouargla",
    value: "ouargla",
  },
  {
    label: "Oran",
    value: "oran",
  },
  {
    label: "El Bayadh",
    value: "el_bayadh",
  },
  {
    label: "Illizi",
    value: "illizi",
  },
  {
    label: "Bordj Bou Arreridj",
    value: "bordj_bou_arreridj",
  },
  {
    label: "Boumerd\u00e8s",
    value: "boumerd\u00e8s",
  },
  {
    label: "El Tarf",
    value: "el_tarf",
  },
  {
    label: "Tindouf",
    value: "tindouf",
  },
  {
    label: "Tissemsilt",
    value: "tissemsilt",
  },
  {
    label: "El Oued",
    value: "el_oued",
  },
  {
    label: "Khenchela",
    value: "khenchela",
  },
  {
    label: "Souk Ahras",
    value: "souk_ahras",
  },
  {
    label: "Tipaza",
    value: "tipaza",
  },
  {
    label: "Mila",
    value: "mila",
  },
  {
    label: "A\u00efn Defla",
    value: "a\u00efn_defla",
  },
  {
    label: "Na\u00e2ma",
    value: "na\u00e2ma",
  },
  {
    label: "A\u00efn T\u00e9mouchent",
    value: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Gharda\u00efa",
    value: "gharda\u00efa",
  },
  {
    label: "Relizane",
    value: "relizane",
  },
  {
    label: "Timimoun",
    value: "timimoun",
  },
  {
    label: "Bordj Badji Mokhtar",
    value: "bordj_badji_mokhtar",
  },
  {
    label: "Ouled Djellal",
    value: "ouled_djellal",
  },
  {
    label: "B\u00e9ni Abb\u00e8s",
    value: "b\u00e9ni_abb\u00e8s",
  },
  {
    label: "In Salah",
    value: "in_salah",
  },
  {
    label: "In Guezzam",
    value: "in_guezzam",
  },
  {
    label: "Touggourt",
    value: "touggourt",
  },
  {
    label: "Djanet",
    value: "djanet",
  },
  {
    label: "El Meghaier",
    value: "el_meghaier",
  },
  {
    label: "El Menia",
    value: "el_menia",
  },
];
const cities = [
  {
    label: "Timekten",
    value: "timekten",
    wilaya: "adrar",
  },
  {
    label: "Bouda",
    value: "bouda",
    wilaya: "adrar",
  },
  {
    label: "Ouled Ahmed Timmi",
    value: "ouled_ahmed_timmi",
    wilaya: "adrar",
  },
  {
    label: "Adrar",
    value: "adrar",
    wilaya: "adrar",
  },
  {
    label: "Fenoughil",
    value: "fenoughil",
    wilaya: "adrar",
  },
  {
    label: "In Zghmir",
    value: "in_zghmir",
    wilaya: "adrar",
  },
  {
    label: "Reggane",
    value: "reggane",
    wilaya: "adrar",
  },
  {
    label: "Sali",
    value: "sali",
    wilaya: "adrar",
  },
  {
    label: "Sebaa",
    value: "sebaa",
    wilaya: "adrar",
  },
  {
    label: "Tsabit",
    value: "tsabit",
    wilaya: "adrar",
  },
  {
    label: "Tamest",
    value: "tamest",
    wilaya: "adrar",
  },
  {
    label: "Tamantit",
    value: "tamantit",
    wilaya: "adrar",
  },
  {
    label: "Tit",
    value: "tit",
    wilaya: "adrar",
  },
  {
    label: "Zaouiet Kounta",
    value: "zaouiet_kounta",
    wilaya: "adrar",
  },
  {
    label: "Akabli",
    value: "akabli",
    wilaya: "adrar",
  },
  {
    label: "Aoulef",
    value: "aoulef",
    wilaya: "adrar",
  },
  {
    label: "Talassa",
    value: "talassa",
    wilaya: "chlef",
  },
  {
    label: "Zeboudja",
    value: "zeboudja",
    wilaya: "chlef",
  },
  {
    label: "El Hadjadj",
    value: "el_hadjadj",
    wilaya: "chlef",
  },
  {
    label: "Ouled Ben Abdelkader",
    value: "ouled_ben_abdelkader",
    wilaya: "chlef",
  },
  {
    label: "Ain Merane",
    value: "ain_merane",
    wilaya: "chlef",
  },
  {
    label: "Breira",
    value: "breira",
    wilaya: "chlef",
  },
  {
    label: "Ouled Abbes",
    value: "ouled_abbes",
    wilaya: "chlef",
  },
  {
    label: "Oued Fodda",
    value: "oued_fodda",
    wilaya: "chlef",
  },
  {
    label: "Beni Rached",
    value: "beni_rached",
    wilaya: "chlef",
  },
  {
    label: "Herenfa",
    value: "herenfa",
    wilaya: "chlef",
  },
  {
    label: "Tadjena",
    value: "tadjena",
    wilaya: "chlef",
  },
  {
    label: "El Marsa",
    value: "el_marsa",
    wilaya: "chlef",
  },
  {
    label: "Chlef",
    value: "chlef",
    wilaya: "chlef",
  },
  {
    label: "Oum Drou",
    value: "oum_drou",
    wilaya: "chlef",
  },
  {
    label: "Sendjas",
    value: "sendjas",
    wilaya: "chlef",
  },
  {
    label: "Sidi Abderrahmane",
    value: "sidi_abderrahmane",
    wilaya: "chlef",
  },
  {
    label: "Sidi Akkacha",
    value: "sidi_akkacha",
    wilaya: "chlef",
  },
  {
    label: "Tenes",
    value: "tenes",
    wilaya: "chlef",
  },
  {
    label: "Beni  Bouattab",
    value: "beni__bouattab",
    wilaya: "chlef",
  },
  {
    label: "El Karimia",
    value: "el_karimia",
    wilaya: "chlef",
  },
  {
    label: "Harchoun",
    value: "harchoun",
    wilaya: "chlef",
  },
  {
    label: "Bouzeghaia",
    value: "bouzeghaia",
    wilaya: "chlef",
  },
  {
    label: "Taougrit",
    value: "taougrit",
    wilaya: "chlef",
  },
  {
    label: "Beni Haoua",
    value: "beni_haoua",
    wilaya: "chlef",
  },
  {
    label: "Abou El Hassane",
    value: "abou_el_hassane",
    wilaya: "chlef",
  },
  {
    label: "Oued Goussine",
    value: "oued_goussine",
    wilaya: "chlef",
  },
  {
    label: "Chettia",
    value: "chettia",
    wilaya: "chlef",
  },
  {
    label: "Moussadek",
    value: "moussadek",
    wilaya: "chlef",
  },
  {
    label: "Ouled Fares",
    value: "ouled_fares",
    wilaya: "chlef",
  },
  {
    label: "Boukadir",
    value: "boukadir",
    wilaya: "chlef",
  },
  {
    label: "Oued Sly",
    value: "oued_sly",
    wilaya: "chlef",
  },
  {
    label: "Sobha",
    value: "sobha",
    wilaya: "chlef",
  },
  {
    label: "Benairia",
    value: "benairia",
    wilaya: "chlef",
  },
  {
    label: "Labiod Medjadja",
    value: "labiod_medjadja",
    wilaya: "chlef",
  },
  {
    label: "Dahra",
    value: "dahra",
    wilaya: "chlef",
  },
  {
    label: "El Beidha",
    value: "el_beidha",
    wilaya: "laghouat",
  },
  {
    label: "Gueltat Sidi Saad",
    value: "gueltat_sidi_saad",
    wilaya: "laghouat",
  },
  {
    label: "Brida",
    value: "brida",
    wilaya: "laghouat",
  },
  {
    label: "Ain Sidi Ali",
    value: "ain_sidi_ali",
    wilaya: "laghouat",
  },
  {
    label: "Tadjemout",
    value: "tadjemout",
    wilaya: "laghouat",
  },
  {
    label: "Hadj Mechri",
    value: "hadj_mechri",
    wilaya: "laghouat",
  },
  {
    label: "Taouiala",
    value: "taouiala",
    wilaya: "laghouat",
  },
  {
    label: "El Ghicha",
    value: "el_ghicha",
    wilaya: "laghouat",
  },
  {
    label: "Tadjrouna",
    value: "tadjrouna",
    wilaya: "laghouat",
  },
  {
    label: "Sebgag",
    value: "sebgag",
    wilaya: "laghouat",
  },
  {
    label: "Sidi Bouzid",
    value: "sidi_bouzid",
    wilaya: "laghouat",
  },
  {
    label: "Oued Morra",
    value: "oued_morra",
    wilaya: "laghouat",
  },
  {
    label: "Laghouat",
    value: "laghouat",
    wilaya: "laghouat",
  },
  {
    label: "Oued M'zi",
    value: "oued_m'zi",
    wilaya: "laghouat",
  },
  {
    label: "Ksar El Hirane",
    value: "ksar_el_hirane",
    wilaya: "laghouat",
  },
  {
    label: "El Assafia",
    value: "el_assafia",
    wilaya: "laghouat",
  },
  {
    label: "Sidi Makhlouf",
    value: "sidi_makhlouf",
    wilaya: "laghouat",
  },
  {
    label: "Hassi Delaa",
    value: "hassi_delaa",
    wilaya: "laghouat",
  },
  {
    label: "Hassi R'mel",
    value: "hassi_r'mel",
    wilaya: "laghouat",
  },
  {
    label: "Ain Madhi",
    value: "ain_madhi",
    wilaya: "laghouat",
  },
  {
    label: "El Haouaita",
    value: "el_haouaita",
    wilaya: "laghouat",
  },
  {
    label: "Kheneg",
    value: "kheneg",
    wilaya: "laghouat",
  },
  {
    label: "Benacer Benchohra",
    value: "benacer_benchohra",
    wilaya: "laghouat",
  },
  {
    label: "Aflou",
    value: "aflou",
    wilaya: "laghouat",
  },
  {
    label: "Fkirina",
    value: "fkirina",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "El Fedjoudj Boughrara Sa",
    value: "el_fedjoudj_boughrara_sa",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Ain Fekroun",
    value: "ain_fekroun",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Rahia",
    value: "rahia",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Meskiana",
    value: "meskiana",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "El Belala",
    value: "el_belala",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Behir Chergui",
    value: "behir_chergui",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Ksar Sbahi",
    value: "ksar_sbahi",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Souk Naamane",
    value: "souk_naamane",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Ouled Zouai",
    value: "ouled_zouai",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Oum El Bouaghi",
    value: "oum_el_bouaghi",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Ain Babouche",
    value: "ain_babouche",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Ain Zitoun",
    value: "ain_zitoun",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Bir Chouhada",
    value: "bir_chouhada",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Ain Beida",
    value: "ain_beida",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Berriche",
    value: "berriche",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Zorg",
    value: "zorg",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Ain M'lila",
    value: "ain_m'lila",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Ouled Gacem",
    value: "ouled_gacem",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Ouled Hamla",
    value: "ouled_hamla",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "El Amiria",
    value: "el_amiria",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Sigus",
    value: "sigus",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Oued Nini",
    value: "oued_nini",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Ain Diss",
    value: "ain_diss",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Dhalaa",
    value: "dhalaa",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "El Djazia",
    value: "el_djazia",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Ain Kercha",
    value: "ain_kercha",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "El Harmilia",
    value: "el_harmilia",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Hanchir Toumghani",
    value: "hanchir_toumghani",
    wilaya: "oum_el_bouaghi",
  },
  {
    label: "Maafa",
    value: "maafa",
    wilaya: "batna",
  },
  {
    label: "Gosbat",
    value: "gosbat",
    wilaya: "batna",
  },
  {
    label: "Timgad",
    value: "timgad",
    wilaya: "batna",
  },
  {
    label: "Taxlent",
    value: "taxlent",
    wilaya: "batna",
  },
  {
    label: "Ouled Si Slimane",
    value: "ouled_si_slimane",
    wilaya: "batna",
  },
  {
    label: "Lemcene",
    value: "lemcene",
    wilaya: "batna",
  },
  {
    label: "Talkhamt",
    value: "talkhamt",
    wilaya: "batna",
  },
  {
    label: "Ras El Aioun",
    value: "ras_el_aioun",
    wilaya: "batna",
  },
  {
    label: "Rahbat",
    value: "rahbat",
    wilaya: "batna",
  },
  {
    label: "Ouled Sellem",
    value: "ouled_sellem",
    wilaya: "batna",
  },
  {
    label: "Guigba",
    value: "guigba",
    wilaya: "batna",
  },
  {
    label: "Teniet El Abed",
    value: "teniet_el_abed",
    wilaya: "batna",
  },
  {
    label: "Batna",
    value: "batna",
    wilaya: "batna",
  },
  {
    label: "Fesdis",
    value: "fesdis",
    wilaya: "batna",
  },
  {
    label: "Oued Chaaba",
    value: "oued_chaaba",
    wilaya: "batna",
  },
  {
    label: "Hidoussa",
    value: "hidoussa",
    wilaya: "batna",
  },
  {
    label: "Ksar Bellezma",
    value: "ksar_bellezma",
    wilaya: "batna",
  },
  {
    label: "Merouana",
    value: "merouana",
    wilaya: "batna",
  },
  {
    label: "Oued El Ma",
    value: "oued_el_ma",
    wilaya: "batna",
  },
  {
    label: "Lazrou",
    value: "lazrou",
    wilaya: "batna",
  },
  {
    label: "Seriana",
    value: "seriana",
    wilaya: "batna",
  },
  {
    label: "Zanet El Beida",
    value: "zanet_el_beida",
    wilaya: "batna",
  },
  {
    label: "Menaa",
    value: "menaa",
    wilaya: "batna",
  },
  {
    label: "Tigharghar",
    value: "tigharghar",
    wilaya: "batna",
  },
  {
    label: "Ain Yagout",
    value: "ain_yagout",
    wilaya: "batna",
  },
  {
    label: "Boumia",
    value: "boumia",
    wilaya: "batna",
  },
  {
    label: "Djerma",
    value: "djerma",
    wilaya: "batna",
  },
  {
    label: "El Madher",
    value: "el_madher",
    wilaya: "batna",
  },
  {
    label: "Ouyoun El Assafir",
    value: "ouyoun_el_assafir",
    wilaya: "batna",
  },
  {
    label: "Tazoult",
    value: "tazoult",
    wilaya: "batna",
  },
  {
    label: "Boumagueur",
    value: "boumagueur",
    wilaya: "batna",
  },
  {
    label: "N Gaous",
    value: "n_gaous",
    wilaya: "batna",
  },
  {
    label: "Sefiane",
    value: "sefiane",
    wilaya: "batna",
  },
  {
    label: "Arris",
    value: "arris",
    wilaya: "batna",
  },
  {
    label: "Tighanimine",
    value: "tighanimine",
    wilaya: "batna",
  },
  {
    label: "Ain Djasser",
    value: "ain_djasser",
    wilaya: "batna",
  },
  {
    label: "El Hassi",
    value: "el_hassi",
    wilaya: "batna",
  },
  {
    label: "Seggana",
    value: "seggana",
    wilaya: "batna",
  },
  {
    label: "Tilatou",
    value: "tilatou",
    wilaya: "batna",
  },
  {
    label: "Foum Toub",
    value: "foum_toub",
    wilaya: "batna",
  },
  {
    label: "Ichemoul",
    value: "ichemoul",
    wilaya: "batna",
  },
  {
    label: "Inoughissen",
    value: "inoughissen",
    wilaya: "batna",
  },
  {
    label: "Bouzina",
    value: "bouzina",
    wilaya: "batna",
  },
  {
    label: "Larbaa",
    value: "larbaa",
    wilaya: "batna",
  },
  {
    label: "Boulhilat",
    value: "boulhilat",
    wilaya: "batna",
  },
  {
    label: "Chemora",
    value: "chemora",
    wilaya: "batna",
  },
  {
    label: "Barika",
    value: "barika",
    wilaya: "batna",
  },
  {
    label: "Bitam",
    value: "bitam",
    wilaya: "batna",
  },
  {
    label: "M Doukal",
    value: "m_doukal",
    wilaya: "batna",
  },
  {
    label: "Azil Abedelkader",
    value: "azil_abedelkader",
    wilaya: "batna",
  },
  {
    label: "Djezzar",
    value: "djezzar",
    wilaya: "batna",
  },
  {
    label: "Ouled Ammar",
    value: "ouled_ammar",
    wilaya: "batna",
  },
  {
    label: "Ghassira",
    value: "ghassira",
    wilaya: "batna",
  },
  {
    label: "Kimmel",
    value: "kimmel",
    wilaya: "batna",
  },
  {
    label: "T Kout",
    value: "t_kout",
    wilaya: "batna",
  },
  {
    label: "Ain Touta",
    value: "ain_touta",
    wilaya: "batna",
  },
  {
    label: "Beni Foudhala El Hakania",
    value: "beni_foudhala_el_hakania",
    wilaya: "batna",
  },
  {
    label: "Ouled Fadel",
    value: "ouled_fadel",
    wilaya: "batna",
  },
  {
    label: "Ouled Aouf",
    value: "ouled_aouf",
    wilaya: "batna",
  },
  {
    label: "Chir",
    value: "chir",
    wilaya: "batna",
  },
  {
    label: "Oued Taga",
    value: "oued_taga",
    wilaya: "batna",
  },
  {
    label: "Sidi Ayad",
    value: "sidi_ayad",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Barbacha",
    value: "barbacha",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Leflaye",
    value: "leflaye",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Kendira",
    value: "kendira",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Sidi-Aich",
    value: "sidi-aich",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Tifra",
    value: "tifra",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Tinebdar",
    value: "tinebdar",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "El Kseur",
    value: "el_kseur",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Fenaia Il Maten",
    value: "fenaia_il_maten",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Toudja",
    value: "toudja",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Dra El Caid",
    value: "dra_el_caid",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Kherrata",
    value: "kherrata",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Bejaia",
    value: "bejaia",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Oued Ghir",
    value: "oued_ghir",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Benimaouche",
    value: "benimaouche",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Beni Djellil",
    value: "beni_djellil",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Feraoun",
    value: "feraoun",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Smaoun",
    value: "smaoun",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Timezrit",
    value: "timezrit",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Melbou",
    value: "melbou",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Souk El Tenine",
    value: "souk_el_tenine",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Tamridjet",
    value: "tamridjet",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Boukhelifa",
    value: "boukhelifa",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Tala Hamza",
    value: "tala_hamza",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Tichy",
    value: "tichy",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Ait R'zine",
    value: "ait_r'zine",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Ighil-Ali",
    value: "ighil-ali",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Ait-Smail",
    value: "ait-smail",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Darguina",
    value: "darguina",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Taskriout",
    value: "taskriout",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Aokas",
    value: "aokas",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Tizi-N'berber",
    value: "tizi-n'berber",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Adekar",
    value: "adekar",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Beni K'sila",
    value: "beni_k'sila",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Taourit Ighil",
    value: "taourit_ighil",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Akbou",
    value: "akbou",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Chellata",
    value: "chellata",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Ighram",
    value: "ighram",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Tamokra",
    value: "tamokra",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Amalou",
    value: "amalou",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Bouhamza",
    value: "bouhamza",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "M'cisna",
    value: "m'cisna",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Seddouk",
    value: "seddouk",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Beni-Mallikeche",
    value: "beni-mallikeche",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Boudjellil",
    value: "boudjellil",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Tazmalt",
    value: "tazmalt",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Akfadou",
    value: "akfadou",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Chemini",
    value: "chemini",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Souk Oufella",
    value: "souk_oufella",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Tibane",
    value: "tibane",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Ouzellaguen",
    value: "ouzellaguen",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "Amizour",
    value: "amizour",
    wilaya: "b\u00e9ja\u00efa",
  },
  {
    label: "El Feidh",
    value: "el_feidh",
    wilaya: "biskra",
  },
  {
    label: "Lichana",
    value: "lichana",
    wilaya: "biskra",
  },
  {
    label: "Bouchakroun",
    value: "bouchakroun",
    wilaya: "biskra",
  },
  {
    label: "Mekhadma",
    value: "mekhadma",
    wilaya: "biskra",
  },
  {
    label: "Djemorah",
    value: "djemorah",
    wilaya: "biskra",
  },
  {
    label: "Branis",
    value: "branis",
    wilaya: "biskra",
  },
  {
    label: "El Outaya",
    value: "el_outaya",
    wilaya: "biskra",
  },
  {
    label: "El Kantara",
    value: "el_kantara",
    wilaya: "biskra",
  },
  {
    label: "Khenguet Sidi Nadji",
    value: "khenguet_sidi_nadji",
    wilaya: "biskra",
  },
  {
    label: "Ain Zaatout",
    value: "ain_zaatout",
    wilaya: "biskra",
  },
  {
    label: "Zeribet El Oued",
    value: "zeribet_el_oued",
    wilaya: "biskra",
  },
  {
    label: "Meziraa",
    value: "meziraa",
    wilaya: "biskra",
  },
  {
    label: "Biskra",
    value: "biskra",
    wilaya: "biskra",
  },
  {
    label: "El Hadjab",
    value: "el_hadjab",
    wilaya: "biskra",
  },
  {
    label: "M'lili",
    value: "m'lili",
    wilaya: "biskra",
  },
  {
    label: "Foughala",
    value: "foughala",
    wilaya: "biskra",
  },
  {
    label: "El Ghrous",
    value: "el_ghrous",
    wilaya: "biskra",
  },
  {
    label: "Bordj Ben Azzouz",
    value: "bordj_ben_azzouz",
    wilaya: "biskra",
  },
  {
    label: "Ourlal",
    value: "ourlal",
    wilaya: "biskra",
  },
  {
    label: "Oumache",
    value: "oumache",
    wilaya: "biskra",
  },
  {
    label: "Ain Naga",
    value: "ain_naga",
    wilaya: "biskra",
  },
  {
    label: "Chetma",
    value: "chetma",
    wilaya: "biskra",
  },
  {
    label: "El Haouch",
    value: "el_haouch",
    wilaya: "biskra",
  },
  {
    label: "Sidi Okba",
    value: "sidi_okba",
    wilaya: "biskra",
  },
  {
    label: "M'chouneche",
    value: "m'chouneche",
    wilaya: "biskra",
  },
  {
    label: "Lioua",
    value: "lioua",
    wilaya: "biskra",
  },
  {
    label: "Tolga",
    value: "tolga",
    wilaya: "biskra",
  },
  {
    label: "Bechar",
    value: "bechar",
    wilaya: "b\u00e9char",
  },
  {
    label: "Boukais",
    value: "boukais",
    wilaya: "b\u00e9char",
  },
  {
    label: "Lahmar",
    value: "lahmar",
    wilaya: "b\u00e9char",
  },
  {
    label: "Mogheul",
    value: "mogheul",
    wilaya: "b\u00e9char",
  },
  {
    label: "Meridja",
    value: "meridja",
    wilaya: "b\u00e9char",
  },
  {
    label: "Taghit",
    value: "taghit",
    wilaya: "b\u00e9char",
  },
  {
    label: "Abadla",
    value: "abadla",
    wilaya: "b\u00e9char",
  },
  {
    label: "Erg-Ferradj",
    value: "erg-ferradj",
    wilaya: "b\u00e9char",
  },
  {
    label: "Machraa-Houari-Boumediene",
    value: "machraa-houari-boumediene",
    wilaya: "b\u00e9char",
  },
  {
    label: "Beni-Ounif",
    value: "beni-ounif",
    wilaya: "b\u00e9char",
  },
  {
    label: "Tabelbala",
    value: "tabelbala",
    wilaya: "b\u00e9char",
  },
  {
    label: "Kenadsa",
    value: "kenadsa",
    wilaya: "b\u00e9char",
  },
  {
    label: "Beni Mered",
    value: "beni_mered",
    wilaya: "blida",
  },
  {
    label: "Ouled Slama",
    value: "ouled_slama",
    wilaya: "blida",
  },
  {
    label: "Mouzaia",
    value: "mouzaia",
    wilaya: "blida",
  },
  {
    label: "Hammam Elouane",
    value: "hammam_elouane",
    wilaya: "blida",
  },
  {
    label: "Bougara",
    value: "bougara",
    wilaya: "blida",
  },
  {
    label: "Souhane",
    value: "souhane",
    wilaya: "blida",
  },
  {
    label: "Larbaa",
    value: "larbaa",
    wilaya: "blida",
  },
  {
    label: "Soumaa",
    value: "soumaa",
    wilaya: "blida",
  },
  {
    label: "Guerrouaou",
    value: "guerrouaou",
    wilaya: "blida",
  },
  {
    label: "Boufarik",
    value: "boufarik",
    wilaya: "blida",
  },
  {
    label: "Meftah",
    value: "meftah",
    wilaya: "blida",
  },
  {
    label: "Chiffa",
    value: "chiffa",
    wilaya: "blida",
  },
  {
    label: "Ain Romana",
    value: "ain_romana",
    wilaya: "blida",
  },
  {
    label: "Oued  Djer",
    value: "oued__djer",
    wilaya: "blida",
  },
  {
    label: "El-Affroun",
    value: "el-affroun",
    wilaya: "blida",
  },
  {
    label: "Ouled Yaich",
    value: "ouled_yaich",
    wilaya: "blida",
  },
  {
    label: "Chrea",
    value: "chrea",
    wilaya: "blida",
  },
  {
    label: "Djebabra",
    value: "djebabra",
    wilaya: "blida",
  },
  {
    label: "Oued El Alleug",
    value: "oued_el_alleug",
    wilaya: "blida",
  },
  {
    label: "Benkhelil",
    value: "benkhelil",
    wilaya: "blida",
  },
  {
    label: "Beni-Tamou",
    value: "beni-tamou",
    wilaya: "blida",
  },
  {
    label: "Chebli",
    value: "chebli",
    wilaya: "blida",
  },
  {
    label: "Bouinan",
    value: "bouinan",
    wilaya: "blida",
  },
  {
    label: "Bouarfa",
    value: "bouarfa",
    wilaya: "blida",
  },
  {
    label: "Blida",
    value: "blida",
    wilaya: "blida",
  },
  {
    label: "Ain Laloui",
    value: "ain_laloui",
    wilaya: "bouira",
  },
  {
    label: "Hadjera Zerga",
    value: "hadjera_zerga",
    wilaya: "bouira",
  },
  {
    label: "Mezdour",
    value: "mezdour",
    wilaya: "bouira",
  },
  {
    label: "Taguedite",
    value: "taguedite",
    wilaya: "bouira",
  },
  {
    label: "Ridane",
    value: "ridane",
    wilaya: "bouira",
  },
  {
    label: "Maamora",
    value: "maamora",
    wilaya: "bouira",
  },
  {
    label: "El-Hakimia",
    value: "el-hakimia",
    wilaya: "bouira",
  },
  {
    label: "Ahl El Ksar",
    value: "ahl_el_ksar",
    wilaya: "bouira",
  },
  {
    label: "Dirah",
    value: "dirah",
    wilaya: "bouira",
  },
  {
    label: "Dechmia",
    value: "dechmia",
    wilaya: "bouira",
  },
  {
    label: "Bechloul",
    value: "bechloul",
    wilaya: "bouira",
  },
  {
    label: "Ath Mansour",
    value: "ath_mansour",
    wilaya: "bouira",
  },
  {
    label: "Saharidj",
    value: "saharidj",
    wilaya: "bouira",
  },
  {
    label: "El Adjiba",
    value: "el_adjiba",
    wilaya: "bouira",
  },
  {
    label: "El Asnam",
    value: "el_asnam",
    wilaya: "bouira",
  },
  {
    label: "M Chedallah",
    value: "m_chedallah",
    wilaya: "bouira",
  },
  {
    label: "Bordj Okhriss",
    value: "bordj_okhriss",
    wilaya: "bouira",
  },
  {
    label: "Sour El Ghozlane",
    value: "sour_el_ghozlane",
    wilaya: "bouira",
  },
  {
    label: "Hanif",
    value: "hanif",
    wilaya: "bouira",
  },
  {
    label: "Chorfa",
    value: "chorfa",
    wilaya: "bouira",
  },
  {
    label: "Ouled Rached",
    value: "ouled_rached",
    wilaya: "bouira",
  },
  {
    label: "Ain El Hadjar",
    value: "ain_el_hadjar",
    wilaya: "bouira",
  },
  {
    label: "Aghbalou",
    value: "aghbalou",
    wilaya: "bouira",
  },
  {
    label: "Raouraoua",
    value: "raouraoua",
    wilaya: "bouira",
  },
  {
    label: "El Khabouzia",
    value: "el_khabouzia",
    wilaya: "bouira",
  },
  {
    label: "Bir Ghbalou",
    value: "bir_ghbalou",
    wilaya: "bouira",
  },
  {
    label: "Bouira",
    value: "bouira",
    wilaya: "bouira",
  },
  {
    label: "Ain Turk",
    value: "ain_turk",
    wilaya: "bouira",
  },
  {
    label: "Ait Laaziz",
    value: "ait_laaziz",
    wilaya: "bouira",
  },
  {
    label: "Ain-Bessem",
    value: "ain-bessem",
    wilaya: "bouira",
  },
  {
    label: "El-Mokrani",
    value: "el-mokrani",
    wilaya: "bouira",
  },
  {
    label: "Souk El Khemis",
    value: "souk_el_khemis",
    wilaya: "bouira",
  },
  {
    label: "Aomar",
    value: "aomar",
    wilaya: "bouira",
  },
  {
    label: "Djebahia",
    value: "djebahia",
    wilaya: "bouira",
  },
  {
    label: "El Hachimia",
    value: "el_hachimia",
    wilaya: "bouira",
  },
  {
    label: "Haizer",
    value: "haizer",
    wilaya: "bouira",
  },
  {
    label: "Taghzout",
    value: "taghzout",
    wilaya: "bouira",
  },
  {
    label: "Bouderbala",
    value: "bouderbala",
    wilaya: "bouira",
  },
  {
    label: "Boukram",
    value: "boukram",
    wilaya: "bouira",
  },
  {
    label: "Guerrouma",
    value: "guerrouma",
    wilaya: "bouira",
  },
  {
    label: "Lakhdaria",
    value: "lakhdaria",
    wilaya: "bouira",
  },
  {
    label: "Maala",
    value: "maala",
    wilaya: "bouira",
  },
  {
    label: "Kadiria",
    value: "kadiria",
    wilaya: "bouira",
  },
  {
    label: "Z'barbar (El Isseri )",
    value: "z'barbar_(el_isseri_)",
    wilaya: "bouira",
  },
  {
    label: "Oued El Berdi",
    value: "oued_el_berdi",
    wilaya: "bouira",
  },
  {
    label: "Tazrouk",
    value: "tazrouk",
    wilaya: "tamanrasset",
  },
  {
    label: "Abelsa",
    value: "abelsa",
    wilaya: "tamanrasset",
  },
  {
    label: "Tamanrasset",
    value: "tamanrasset",
    wilaya: "tamanrasset",
  },
  {
    label: "Ain Amguel",
    value: "ain_amguel",
    wilaya: "tamanrasset",
  },
  {
    label: "Idles",
    value: "idles",
    wilaya: "tamanrasset",
  },
  {
    label: "El-Houidjbet",
    value: "el-houidjbet",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "El-Aouinet",
    value: "el-aouinet",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Ferkane",
    value: "ferkane",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Negrine",
    value: "negrine",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Bir Mokkadem",
    value: "bir_mokkadem",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Bir Dheheb",
    value: "bir_dheheb",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Saf Saf El Ouesra",
    value: "saf_saf_el_ouesra",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Guorriguer",
    value: "guorriguer",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Bekkaria",
    value: "bekkaria",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Boulhaf Dyr",
    value: "boulhaf_dyr",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Oum Ali",
    value: "oum_ali",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Boukhadra",
    value: "boukhadra",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "El Malabiod",
    value: "el_malabiod",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Ouenza",
    value: "ouenza",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "El Meridj",
    value: "el_meridj",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Ain Zerga",
    value: "ain_zerga",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Stah Guentis",
    value: "stah_guentis",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "El Ogla",
    value: "el_ogla",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "El Mezeraa",
    value: "el_mezeraa",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Bedjene",
    value: "bedjene",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Morsott",
    value: "morsott",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Telidjen",
    value: "telidjen",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Cheria",
    value: "cheria",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "El Ogla El Malha",
    value: "el_ogla_el_malha",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Bir-El-Ater",
    value: "bir-el-ater",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Tebessa",
    value: "tebessa",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Hammamet",
    value: "hammamet",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "El Kouif",
    value: "el_kouif",
    wilaya: "t\u00e9bessa",
  },
  {
    label: "Bab El Assa",
    value: "bab_el_assa",
    wilaya: "tlemcen",
  },
  {
    label: "Terny Beni Hediel",
    value: "terny_beni_hediel",
    wilaya: "tlemcen",
  },
  {
    label: "Mansourah",
    value: "mansourah",
    wilaya: "tlemcen",
  },
  {
    label: "Beni Mester",
    value: "beni_mester",
    wilaya: "tlemcen",
  },
  {
    label: "Ain Ghoraba",
    value: "ain_ghoraba",
    wilaya: "tlemcen",
  },
  {
    label: "Chetouane",
    value: "chetouane",
    wilaya: "tlemcen",
  },
  {
    label: "Amieur",
    value: "amieur",
    wilaya: "tlemcen",
  },
  {
    label: "Ain Fezza",
    value: "ain_fezza",
    wilaya: "tlemcen",
  },
  {
    label: "Honnaine",
    value: "honnaine",
    wilaya: "tlemcen",
  },
  {
    label: "Beni Khellad",
    value: "beni_khellad",
    wilaya: "tlemcen",
  },
  {
    label: "Sidi Djillali",
    value: "sidi_djillali",
    wilaya: "tlemcen",
  },
  {
    label: "Bouihi",
    value: "bouihi",
    wilaya: "tlemcen",
  },
  {
    label: "Nedroma",
    value: "nedroma",
    wilaya: "tlemcen",
  },
  {
    label: "M'sirda Fouaga",
    value: "m'sirda_fouaga",
    wilaya: "tlemcen",
  },
  {
    label: "Marsa Ben M'hidi",
    value: "marsa_ben_m'hidi",
    wilaya: "tlemcen",
  },
  {
    label: "Sidi Medjahed",
    value: "sidi_medjahed",
    wilaya: "tlemcen",
  },
  {
    label: "Beni Boussaid",
    value: "beni_boussaid",
    wilaya: "tlemcen",
  },
  {
    label: "Sebdou",
    value: "sebdou",
    wilaya: "tlemcen",
  },
  {
    label: "El Gor",
    value: "el_gor",
    wilaya: "tlemcen",
  },
  {
    label: "El Aricha",
    value: "el_aricha",
    wilaya: "tlemcen",
  },
  {
    label: "Bouhlou",
    value: "bouhlou",
    wilaya: "tlemcen",
  },
  {
    label: "Maghnia",
    value: "maghnia",
    wilaya: "tlemcen",
  },
  {
    label: "Hammam Boughrara",
    value: "hammam_boughrara",
    wilaya: "tlemcen",
  },
  {
    label: "Zenata",
    value: "zenata",
    wilaya: "tlemcen",
  },
  {
    label: "Ouled Riyah",
    value: "ouled_riyah",
    wilaya: "tlemcen",
  },
  {
    label: "Hennaya",
    value: "hennaya",
    wilaya: "tlemcen",
  },
  {
    label: "Sidi Abdelli",
    value: "sidi_abdelli",
    wilaya: "tlemcen",
  },
  {
    label: "Souk Tleta",
    value: "souk_tleta",
    wilaya: "tlemcen",
  },
  {
    label: "Bensekrane",
    value: "bensekrane",
    wilaya: "tlemcen",
  },
  {
    label: "Fellaoucene",
    value: "fellaoucene",
    wilaya: "tlemcen",
  },
  {
    label: "Ain Kebira",
    value: "ain_kebira",
    wilaya: "tlemcen",
  },
  {
    label: "Ain Fetah",
    value: "ain_fetah",
    wilaya: "tlemcen",
  },
  {
    label: "Tlemcen",
    value: "tlemcen",
    wilaya: "tlemcen",
  },
  {
    label: "Ain Nehala",
    value: "ain_nehala",
    wilaya: "tlemcen",
  },
  {
    label: "Ain Tellout",
    value: "ain_tellout",
    wilaya: "tlemcen",
  },
  {
    label: "Ain Youcef",
    value: "ain_youcef",
    wilaya: "tlemcen",
  },
  {
    label: "Beni Ouarsous",
    value: "beni_ouarsous",
    wilaya: "tlemcen",
  },
  {
    label: "El Fehoul",
    value: "el_fehoul",
    wilaya: "tlemcen",
  },
  {
    label: "Remchi",
    value: "remchi",
    wilaya: "tlemcen",
  },
  {
    label: "Sebbaa Chioukh",
    value: "sebbaa_chioukh",
    wilaya: "tlemcen",
  },
  {
    label: "Souani",
    value: "souani",
    wilaya: "tlemcen",
  },
  {
    label: "Sabra",
    value: "sabra",
    wilaya: "tlemcen",
  },
  {
    label: "Dar Yaghmoracen",
    value: "dar_yaghmoracen",
    wilaya: "tlemcen",
  },
  {
    label: "Ghazaouet",
    value: "ghazaouet",
    wilaya: "tlemcen",
  },
  {
    label: "Souahlia",
    value: "souahlia",
    wilaya: "tlemcen",
  },
  {
    label: "Tianet",
    value: "tianet",
    wilaya: "tlemcen",
  },
  {
    label: "Beni Smiel",
    value: "beni_smiel",
    wilaya: "tlemcen",
  },
  {
    label: "Oued Lakhdar",
    value: "oued_lakhdar",
    wilaya: "tlemcen",
  },
  {
    label: "Ouled Mimoun",
    value: "ouled_mimoun",
    wilaya: "tlemcen",
  },
  {
    label: "Beni Bahdel",
    value: "beni_bahdel",
    wilaya: "tlemcen",
  },
  {
    label: "Beni Snous",
    value: "beni_snous",
    wilaya: "tlemcen",
  },
  {
    label: "Azail",
    value: "azail",
    wilaya: "tlemcen",
  },
  {
    label: "Djebala",
    value: "djebala",
    wilaya: "tlemcen",
  },
  {
    label: "Mahdia",
    value: "mahdia",
    wilaya: "tiaret",
  },
  {
    label: "Ain Dzarit",
    value: "ain_dzarit",
    wilaya: "tiaret",
  },
  {
    label: "Sebaine",
    value: "sebaine",
    wilaya: "tiaret",
  },
  {
    label: "Faidja",
    value: "faidja",
    wilaya: "tiaret",
  },
  {
    label: "Si Abdelghani",
    value: "si_abdelghani",
    wilaya: "tiaret",
  },
  {
    label: "Sougueur",
    value: "sougueur",
    wilaya: "tiaret",
  },
  {
    label: "Tousnina",
    value: "tousnina",
    wilaya: "tiaret",
  },
  {
    label: "Meghila",
    value: "meghila",
    wilaya: "tiaret",
  },
  {
    label: "Sebt",
    value: "sebt",
    wilaya: "tiaret",
  },
  {
    label: "Sidi Hosni",
    value: "sidi_hosni",
    wilaya: "tiaret",
  },
  {
    label: "Ain El Hadid",
    value: "ain_el_hadid",
    wilaya: "tiaret",
  },
  {
    label: "Frenda",
    value: "frenda",
    wilaya: "tiaret",
  },
  {
    label: "Takhemaret",
    value: "takhemaret",
    wilaya: "tiaret",
  },
  {
    label: "Ain Kermes",
    value: "ain_kermes",
    wilaya: "tiaret",
  },
  {
    label: "Djebilet Rosfa",
    value: "djebilet_rosfa",
    wilaya: "tiaret",
  },
  {
    label: "Madna",
    value: "madna",
    wilaya: "tiaret",
  },
  {
    label: "Medrissa",
    value: "medrissa",
    wilaya: "tiaret",
  },
  {
    label: "Sidi Abderrahmane",
    value: "sidi_abderrahmane",
    wilaya: "tiaret",
  },
  {
    label: "Ksar Chellala",
    value: "ksar_chellala",
    wilaya: "tiaret",
  },
  {
    label: "Guertoufa",
    value: "guertoufa",
    wilaya: "tiaret",
  },
  {
    label: "Serghine",
    value: "serghine",
    wilaya: "tiaret",
  },
  {
    label: "Zmalet El Emir Abdelkade",
    value: "zmalet_el_emir_abdelkade",
    wilaya: "tiaret",
  },
  {
    label: "Oued Lilli",
    value: "oued_lilli",
    wilaya: "tiaret",
  },
  {
    label: "Sidi Ali Mellal",
    value: "sidi_ali_mellal",
    wilaya: "tiaret",
  },
  {
    label: "Djillali Ben Amar",
    value: "djillali_ben_amar",
    wilaya: "tiaret",
  },
  {
    label: "Mechraa Safa",
    value: "mechraa_safa",
    wilaya: "tiaret",
  },
  {
    label: "Tagdempt",
    value: "tagdempt",
    wilaya: "tiaret",
  },
  {
    label: "Bougara",
    value: "bougara",
    wilaya: "tiaret",
  },
  {
    label: "Hamadia",
    value: "hamadia",
    wilaya: "tiaret",
  },
  {
    label: "Rechaiga",
    value: "rechaiga",
    wilaya: "tiaret",
  },
  {
    label: "Tidda",
    value: "tidda",
    wilaya: "tiaret",
  },
  {
    label: "Nadorah",
    value: "nadorah",
    wilaya: "tiaret",
  },
  {
    label: "Tiaret",
    value: "tiaret",
    wilaya: "tiaret",
  },
  {
    label: "Medroussa",
    value: "medroussa",
    wilaya: "tiaret",
  },
  {
    label: "Mellakou",
    value: "mellakou",
    wilaya: "tiaret",
  },
  {
    label: "Sidi Bakhti",
    value: "sidi_bakhti",
    wilaya: "tiaret",
  },
  {
    label: "Ain Deheb",
    value: "ain_deheb",
    wilaya: "tiaret",
  },
  {
    label: "Chehaima",
    value: "chehaima",
    wilaya: "tiaret",
  },
  {
    label: "Naima",
    value: "naima",
    wilaya: "tiaret",
  },
  {
    label: "Ain Bouchekif",
    value: "ain_bouchekif",
    wilaya: "tiaret",
  },
  {
    label: "Dahmouni",
    value: "dahmouni",
    wilaya: "tiaret",
  },
  {
    label: "Rahouia",
    value: "rahouia",
    wilaya: "tiaret",
  },
  {
    label: "Mizrana",
    value: "mizrana",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Idjeur",
    value: "idjeur",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Beni-Douala",
    value: "beni-douala",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Beni-Zikki",
    value: "beni-zikki",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Illoula Oumalou",
    value: "illoula_oumalou",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Agouni-Gueghrane",
    value: "agouni-gueghrane",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ait Bouaddou",
    value: "ait_bouaddou",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ouadhias",
    value: "ouadhias",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Tizi N'tleta",
    value: "tizi_n'tleta",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Aghribs",
    value: "aghribs",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ait-Chafaa",
    value: "ait-chafaa",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Akerrou",
    value: "akerrou",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Azeffoun",
    value: "azeffoun",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Iflissen",
    value: "iflissen",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Tigzirt",
    value: "tigzirt",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Assi-Youcef",
    value: "assi-youcef",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Boghni",
    value: "boghni",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Bounouh",
    value: "bounouh",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Mechtras",
    value: "mechtras",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Draa-Ben-Khedda",
    value: "draa-ben-khedda",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Sidi Namane",
    value: "sidi_namane",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Tadmait",
    value: "tadmait",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Tirmitine",
    value: "tirmitine",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ait Boumahdi",
    value: "ait_boumahdi",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ait-Toudert",
    value: "ait-toudert",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Beni-Aissi",
    value: "beni-aissi",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ouacif",
    value: "ouacif",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ait Khellili",
    value: "ait_khellili",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Mekla",
    value: "mekla",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Souama",
    value: "souama",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Beni-Yenni",
    value: "beni-yenni",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Iboudrarene",
    value: "iboudrarene",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Tizi-Ouzou",
    value: "tizi-ouzou",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Abi-Youcef",
    value: "abi-youcef",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ain-El-Hammam",
    value: "ain-el-hammam",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ait-Yahia",
    value: "ait-yahia",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Akbil",
    value: "akbil",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Boudjima",
    value: "boudjima",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Makouda",
    value: "makouda",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ain-Zaouia",
    value: "ain-zaouia",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ait Yahia Moussa",
    value: "ait_yahia_moussa",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Draa-El-Mizan",
    value: "draa-el-mizan",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Frikat",
    value: "frikat",
    wilaya: "tizi_ouzou",
  },
  {
    label: "M'kira",
    value: "m'kira",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Tizi-Gheniff",
    value: "tizi-gheniff",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Yatafene",
    value: "yatafene",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Illilten",
    value: "illilten",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Imsouhal",
    value: "imsouhal",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Azazga",
    value: "azazga",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Freha",
    value: "freha",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ifigha",
    value: "ifigha",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Yakourene",
    value: "yakourene",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Zekri",
    value: "zekri",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ait Aggouacha",
    value: "ait_aggouacha",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Irdjen",
    value: "irdjen",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Larbaa Nath Irathen",
    value: "larbaa_nath_irathen",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ait-Oumalou",
    value: "ait-oumalou",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Tizi-Rached",
    value: "tizi-rached",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ait-Aissa-Mimoun",
    value: "ait-aissa-mimoun",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ouaguenoun",
    value: "ouaguenoun",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Timizart",
    value: "timizart",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Maatkas",
    value: "maatkas",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Souk-El-Tenine",
    value: "souk-el-tenine",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Ait-Mahmoud",
    value: "ait-mahmoud",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Beni Zmenzer",
    value: "beni_zmenzer",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Iferhounene",
    value: "iferhounene",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Bouzeguene",
    value: "bouzeguene",
    wilaya: "tizi_ouzou",
  },
  {
    label: "Hussein Dey",
    value: "hussein_dey",
    wilaya: "alger",
  },
  {
    label: "Les Eucalyptus",
    value: "les_eucalyptus",
    wilaya: "alger",
  },
  {
    label: "Sidi Moussa",
    value: "sidi_moussa",
    wilaya: "alger",
  },
  {
    label: "Kouba",
    value: "kouba",
    wilaya: "alger",
  },
  {
    label: "Mohamed Belouzdad",
    value: "mohamed_belouzdad",
    wilaya: "alger",
  },
  {
    label: "Ain Taya",
    value: "ain_taya",
    wilaya: "alger",
  },
  {
    label: "Bab Ezzouar",
    value: "bab_ezzouar",
    wilaya: "alger",
  },
  {
    label: "Bordj El Kiffan",
    value: "bordj_el_kiffan",
    wilaya: "alger",
  },
  {
    label: "Dar El Beida",
    value: "dar_el_beida",
    wilaya: "alger",
  },
  {
    label: "El Marsa",
    value: "el_marsa",
    wilaya: "alger",
  },
  {
    label: "Mohammadia",
    value: "mohammadia",
    wilaya: "alger",
  },
  {
    label: "Bir Touta",
    value: "bir_touta",
    wilaya: "alger",
  },
  {
    label: "Ouled Chebel",
    value: "ouled_chebel",
    wilaya: "alger",
  },
  {
    label: "Tessala El Merdja",
    value: "tessala_el_merdja",
    wilaya: "alger",
  },
  {
    label: "Herraoua",
    value: "herraoua",
    wilaya: "alger",
  },
  {
    label: "Reghaia",
    value: "reghaia",
    wilaya: "alger",
  },
  {
    label: "Rouiba",
    value: "rouiba",
    wilaya: "alger",
  },
  {
    label: "Maalma",
    value: "maalma",
    wilaya: "alger",
  },
  {
    label: "Rahmania",
    value: "rahmania",
    wilaya: "alger",
  },
  {
    label: "Souidania",
    value: "souidania",
    wilaya: "alger",
  },
  {
    label: "Staoueli",
    value: "staoueli",
    wilaya: "alger",
  },
  {
    label: "Zeralda",
    value: "zeralda",
    wilaya: "alger",
  },
  {
    label: "Baba Hassen",
    value: "baba_hassen",
    wilaya: "alger",
  },
  {
    label: "Douira",
    value: "douira",
    wilaya: "alger",
  },
  {
    label: "Draria",
    value: "draria",
    wilaya: "alger",
  },
  {
    label: "El Achour",
    value: "el_achour",
    wilaya: "alger",
  },
  {
    label: "Khraissia",
    value: "khraissia",
    wilaya: "alger",
  },
  {
    label: "Ain Benian",
    value: "ain_benian",
    wilaya: "alger",
  },
  {
    label: "Cheraga",
    value: "cheraga",
    wilaya: "alger",
  },
  {
    label: "Dely Ibrahim",
    value: "dely_ibrahim",
    wilaya: "alger",
  },
  {
    label: "Hammamet",
    value: "hammamet",
    wilaya: "alger",
  },
  {
    label: "Ouled Fayet",
    value: "ouled_fayet",
    wilaya: "alger",
  },
  {
    label: "Alger Centre",
    value: "alger_centre",
    wilaya: "alger",
  },
  {
    label: "El Madania",
    value: "el_madania",
    wilaya: "alger",
  },
  {
    label: "El Mouradia",
    value: "el_mouradia",
    wilaya: "alger",
  },
  {
    label: "Sidi M'hamed",
    value: "sidi_m'hamed",
    wilaya: "alger",
  },
  {
    label: "Sehaoula",
    value: "sehaoula",
    wilaya: "alger",
  },
  {
    label: "Bologhine Ibnou Ziri",
    value: "bologhine_ibnou_ziri",
    wilaya: "alger",
  },
  {
    label: "Casbah",
    value: "casbah",
    wilaya: "alger",
  },
  {
    label: "Oued Koriche",
    value: "oued_koriche",
    wilaya: "alger",
  },
  {
    label: "Rais Hamidou",
    value: "rais_hamidou",
    wilaya: "alger",
  },
  {
    label: "Bir Mourad Rais",
    value: "bir_mourad_rais",
    wilaya: "alger",
  },
  {
    label: "Birkhadem",
    value: "birkhadem",
    wilaya: "alger",
  },
  {
    label: "Djasr Kasentina",
    value: "djasr_kasentina",
    wilaya: "alger",
  },
  {
    label: "Hydra",
    value: "hydra",
    wilaya: "alger",
  },
  {
    label: "El Magharia",
    value: "el_magharia",
    wilaya: "alger",
  },
  {
    label: "Ben Aknoun",
    value: "ben_aknoun",
    wilaya: "alger",
  },
  {
    label: "Beni Messous",
    value: "beni_messous",
    wilaya: "alger",
  },
  {
    label: "Bouzareah",
    value: "bouzareah",
    wilaya: "alger",
  },
  {
    label: "El Biar",
    value: "el_biar",
    wilaya: "alger",
  },
  {
    label: "Bachedjerah",
    value: "bachedjerah",
    wilaya: "alger",
  },
  {
    label: "Bourouba",
    value: "bourouba",
    wilaya: "alger",
  },
  {
    label: "El Harrach",
    value: "el_harrach",
    wilaya: "alger",
  },
  {
    label: "Oued Smar",
    value: "oued_smar",
    wilaya: "alger",
  },
  {
    label: "Baraki",
    value: "baraki",
    wilaya: "alger",
  },
  {
    label: "Bordj El Bahri",
    value: "bordj_el_bahri",
    wilaya: "alger",
  },
  {
    label: "Bab El Oued",
    value: "bab_el_oued",
    wilaya: "alger",
  },
  {
    label: "Hassi El Euch",
    value: "hassi_el_euch",
    wilaya: "djelfa",
  },
  {
    label: "Ain El Ibel",
    value: "ain_el_ibel",
    wilaya: "djelfa",
  },
  {
    label: "El Guedid",
    value: "el_guedid",
    wilaya: "djelfa",
  },
  {
    label: "Charef",
    value: "charef",
    wilaya: "djelfa",
  },
  {
    label: "Benyagoub",
    value: "benyagoub",
    wilaya: "djelfa",
  },
  {
    label: "Sidi Baizid",
    value: "sidi_baizid",
    wilaya: "djelfa",
  },
  {
    label: "M'liliha",
    value: "m'liliha",
    wilaya: "djelfa",
  },
  {
    label: "Dar Chioukh",
    value: "dar_chioukh",
    wilaya: "djelfa",
  },
  {
    label: "Taadmit",
    value: "taadmit",
    wilaya: "djelfa",
  },
  {
    label: "Had Sahary",
    value: "had_sahary",
    wilaya: "djelfa",
  },
  {
    label: "Bouira Lahdab",
    value: "bouira_lahdab",
    wilaya: "djelfa",
  },
  {
    label: "Ain Fekka",
    value: "ain_fekka",
    wilaya: "djelfa",
  },
  {
    label: "Sidi Laadjel",
    value: "sidi_laadjel",
    wilaya: "djelfa",
  },
  {
    label: "Hassi Fedoul",
    value: "hassi_fedoul",
    wilaya: "djelfa",
  },
  {
    label: "El Khemis",
    value: "el_khemis",
    wilaya: "djelfa",
  },
  {
    label: "Selmana",
    value: "selmana",
    wilaya: "djelfa",
  },
  {
    label: "Sed Rahal",
    value: "sed_rahal",
    wilaya: "djelfa",
  },
  {
    label: "Messaad",
    value: "messaad",
    wilaya: "djelfa",
  },
  {
    label: "Guettara",
    value: "guettara",
    wilaya: "djelfa",
  },
  {
    label: "Deldoul",
    value: "deldoul",
    wilaya: "djelfa",
  },
  {
    label: "Zaccar",
    value: "zaccar",
    wilaya: "djelfa",
  },
  {
    label: "Douis",
    value: "douis",
    wilaya: "djelfa",
  },
  {
    label: "El Idrissia",
    value: "el_idrissia",
    wilaya: "djelfa",
  },
  {
    label: "Ain Chouhada",
    value: "ain_chouhada",
    wilaya: "djelfa",
  },
  {
    label: "Djelfa",
    value: "djelfa",
    wilaya: "djelfa",
  },
  {
    label: "Birine",
    value: "birine",
    wilaya: "djelfa",
  },
  {
    label: "Oum Laadham",
    value: "oum_laadham",
    wilaya: "djelfa",
  },
  {
    label: "Faidh El Botma",
    value: "faidh_el_botma",
    wilaya: "djelfa",
  },
  {
    label: "Amourah",
    value: "amourah",
    wilaya: "djelfa",
  },
  {
    label: "Zaafrane",
    value: "zaafrane",
    wilaya: "djelfa",
  },
  {
    label: "Guernini",
    value: "guernini",
    wilaya: "djelfa",
  },
  {
    label: "Ain Oussera",
    value: "ain_oussera",
    wilaya: "djelfa",
  },
  {
    label: "Benhar",
    value: "benhar",
    wilaya: "djelfa",
  },
  {
    label: "Ain Maabed",
    value: "ain_maabed",
    wilaya: "djelfa",
  },
  {
    label: "Hassi Bahbah",
    value: "hassi_bahbah",
    wilaya: "djelfa",
  },
  {
    label: "Moudjebara",
    value: "moudjebara",
    wilaya: "djelfa",
  },
  {
    label: "Jijel",
    value: "jijel",
    wilaya: "jijel",
  },
  {
    label: "El Aouana",
    value: "el_aouana",
    wilaya: "jijel",
  },
  {
    label: "Selma Benziada",
    value: "selma_benziada",
    wilaya: "jijel",
  },
  {
    label: "Erraguene Souissi",
    value: "erraguene_souissi",
    wilaya: "jijel",
  },
  {
    label: "Boussif Ouled Askeur",
    value: "boussif_ouled_askeur",
    wilaya: "jijel",
  },
  {
    label: "Ziama Mansouriah",
    value: "ziama_mansouriah",
    wilaya: "jijel",
  },
  {
    label: "Chahna",
    value: "chahna",
    wilaya: "jijel",
  },
  {
    label: "Emir Abdelkader",
    value: "emir_abdelkader",
    wilaya: "jijel",
  },
  {
    label: "Oudjana",
    value: "oudjana",
    wilaya: "jijel",
  },
  {
    label: "Taher",
    value: "taher",
    wilaya: "jijel",
  },
  {
    label: "Chekfa",
    value: "chekfa",
    wilaya: "jijel",
  },
  {
    label: "El Kennar Nouchfi",
    value: "el_kennar_nouchfi",
    wilaya: "jijel",
  },
  {
    label: "Sidi Abdelaziz",
    value: "sidi_abdelaziz",
    wilaya: "jijel",
  },
  {
    label: "El Milia",
    value: "el_milia",
    wilaya: "jijel",
  },
  {
    label: "Ouled Yahia Khadrouch",
    value: "ouled_yahia_khadrouch",
    wilaya: "jijel",
  },
  {
    label: "Ouled Rabah",
    value: "ouled_rabah",
    wilaya: "jijel",
  },
  {
    label: "Sidi Marouf",
    value: "sidi_marouf",
    wilaya: "jijel",
  },
  {
    label: "Ghebala",
    value: "ghebala",
    wilaya: "jijel",
  },
  {
    label: "Settara",
    value: "settara",
    wilaya: "jijel",
  },
  {
    label: "Bouraoui Belhadef",
    value: "bouraoui_belhadef",
    wilaya: "jijel",
  },
  {
    label: "El Ancer",
    value: "el_ancer",
    wilaya: "jijel",
  },
  {
    label: "Khiri Oued Adjoul",
    value: "khiri_oued_adjoul",
    wilaya: "jijel",
  },
  {
    label: "Djimla",
    value: "djimla",
    wilaya: "jijel",
  },
  {
    label: "Kaous",
    value: "kaous",
    wilaya: "jijel",
  },
  {
    label: "Texenna",
    value: "texenna",
    wilaya: "jijel",
  },
  {
    label: "Bordj T'har",
    value: "bordj_t'har",
    wilaya: "jijel",
  },
  {
    label: "Boudria Beniyadjis",
    value: "boudria_beniyadjis",
    wilaya: "jijel",
  },
  {
    label: "Djemaa Beni Habibi",
    value: "djemaa_beni_habibi",
    wilaya: "jijel",
  },
  {
    label: "Rosfa",
    value: "rosfa",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Oued El Bared",
    value: "oued_el_bared",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Tizi N'bechar",
    value: "tizi_n'bechar",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Mezloug",
    value: "mezloug",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Guellal",
    value: "guellal",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Kasr El Abtal",
    value: "kasr_el_abtal",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Ouled Si Ahmed",
    value: "ouled_si_ahmed",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Ait Naoual Mezada",
    value: "ait_naoual_mezada",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Ait-Tizi",
    value: "ait-tizi",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Bouandas",
    value: "bouandas",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Bousselam",
    value: "bousselam",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Hamam Soukhna",
    value: "hamam_soukhna",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Taya",
    value: "taya",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Tella",
    value: "tella",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Ain Oulmene",
    value: "ain_oulmene",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Boutaleb",
    value: "boutaleb",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Hamma",
    value: "hamma",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Ouled Tebben",
    value: "ouled_tebben",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Amoucha",
    value: "amoucha",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Salah Bey",
    value: "salah_bey",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Ain Azel",
    value: "ain_azel",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Ain Lahdjar",
    value: "ain_lahdjar",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Beidha Bordj",
    value: "beidha_bordj",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Bir Haddada",
    value: "bir_haddada",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Guenzet",
    value: "guenzet",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Harbil",
    value: "harbil",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Ain-Roua",
    value: "ain-roua",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Beni Oussine",
    value: "beni_oussine",
    wilaya: "s\u00e9tif",
  },
  {
    label: "El Ouricia",
    value: "el_ouricia",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Bougaa",
    value: "bougaa",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Draa-Kebila",
    value: "draa-kebila",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Hammam Guergour",
    value: "hammam_guergour",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Setif",
    value: "setif",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Ain El Kebira",
    value: "ain_el_kebira",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Dehamcha",
    value: "dehamcha",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Ouled Addouane",
    value: "ouled_addouane",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Ain-Sebt",
    value: "ain-sebt",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Beni-Aziz",
    value: "beni-aziz",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Maaouia",
    value: "maaouia",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Bellaa",
    value: "bellaa",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Bir-El-Arch",
    value: "bir-el-arch",
    wilaya: "s\u00e9tif",
  },
  {
    label: "El-Ouldja",
    value: "el-ouldja",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Tachouda",
    value: "tachouda",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Tala-Ifacene",
    value: "tala-ifacene",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Serdj-El-Ghoul",
    value: "serdj-el-ghoul",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Guidjel",
    value: "guidjel",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Ouled Sabor",
    value: "ouled_sabor",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Bazer-Sakra",
    value: "bazer-sakra",
    wilaya: "s\u00e9tif",
  },
  {
    label: "El Eulma",
    value: "el_eulma",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Guelta Zerka",
    value: "guelta_zerka",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Beni Fouda",
    value: "beni_fouda",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Djemila",
    value: "djemila",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Ain-Legradj",
    value: "ain-legradj",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Beni Chebana",
    value: "beni_chebana",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Beni Ourtilane",
    value: "beni_ourtilane",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Beni-Mouhli",
    value: "beni-mouhli",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Ain Abessa",
    value: "ain_abessa",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Ain Arnat",
    value: "ain_arnat",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Babor",
    value: "babor",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Maouaklane",
    value: "maouaklane",
    wilaya: "s\u00e9tif",
  },
  {
    label: "Saida",
    value: "saida",
    wilaya: "sa\u00efda",
  },
  {
    label: "Tircine",
    value: "tircine",
    wilaya: "sa\u00efda",
  },
  {
    label: "Ouled Brahim",
    value: "ouled_brahim",
    wilaya: "sa\u00efda",
  },
  {
    label: "Ain Soltane",
    value: "ain_soltane",
    wilaya: "sa\u00efda",
  },
  {
    label: "Maamora",
    value: "maamora",
    wilaya: "sa\u00efda",
  },
  {
    label: "El Hassasna",
    value: "el_hassasna",
    wilaya: "sa\u00efda",
  },
  {
    label: "Ain Sekhouna",
    value: "ain_sekhouna",
    wilaya: "sa\u00efda",
  },
  {
    label: "Sidi Boubekeur",
    value: "sidi_boubekeur",
    wilaya: "sa\u00efda",
  },
  {
    label: "Ouled Khaled",
    value: "ouled_khaled",
    wilaya: "sa\u00efda",
  },
  {
    label: "Hounet",
    value: "hounet",
    wilaya: "sa\u00efda",
  },
  {
    label: "Youb",
    value: "youb",
    wilaya: "sa\u00efda",
  },
  {
    label: "Doui Thabet",
    value: "doui_thabet",
    wilaya: "sa\u00efda",
  },
  {
    label: "Sidi Ahmed",
    value: "sidi_ahmed",
    wilaya: "sa\u00efda",
  },
  {
    label: "Moulay Larbi",
    value: "moulay_larbi",
    wilaya: "sa\u00efda",
  },
  {
    label: "Ain El Hadjar",
    value: "ain_el_hadjar",
    wilaya: "sa\u00efda",
  },
  {
    label: "Sidi Amar",
    value: "sidi_amar",
    wilaya: "sa\u00efda",
  },
  {
    label: "Ain Bouziane",
    value: "ain_bouziane",
    wilaya: "skikda",
  },
  {
    label: "Salah Bouchaour",
    value: "salah_bouchaour",
    wilaya: "skikda",
  },
  {
    label: "El Hadaiek",
    value: "el_hadaiek",
    wilaya: "skikda",
  },
  {
    label: "Zerdezas",
    value: "zerdezas",
    wilaya: "skikda",
  },
  {
    label: "Ouled Habbaba",
    value: "ouled_habbaba",
    wilaya: "skikda",
  },
  {
    label: "Beni Oulbane",
    value: "beni_oulbane",
    wilaya: "skikda",
  },
  {
    label: "Sidi Mezghiche",
    value: "sidi_mezghiche",
    wilaya: "skikda",
  },
  {
    label: "Beni Bechir",
    value: "beni_bechir",
    wilaya: "skikda",
  },
  {
    label: "Ramdane Djamel",
    value: "ramdane_djamel",
    wilaya: "skikda",
  },
  {
    label: "Bin El Ouiden",
    value: "bin_el_ouiden",
    wilaya: "skikda",
  },
  {
    label: "Emjez Edchich",
    value: "emjez_edchich",
    wilaya: "skikda",
  },
  {
    label: "Tamalous",
    value: "tamalous",
    wilaya: "skikda",
  },
  {
    label: "Ain Kechra",
    value: "ain_kechra",
    wilaya: "skikda",
  },
  {
    label: "Ouldja Boulbalout",
    value: "ouldja_boulbalout",
    wilaya: "skikda",
  },
  {
    label: "Oum Toub",
    value: "oum_toub",
    wilaya: "skikda",
  },
  {
    label: "El Ghedir",
    value: "el_ghedir",
    wilaya: "skikda",
  },
  {
    label: "Kerkara",
    value: "kerkara",
    wilaya: "skikda",
  },
  {
    label: "El Arrouch",
    value: "el_arrouch",
    wilaya: "skikda",
  },
  {
    label: "Zitouna",
    value: "zitouna",
    wilaya: "skikda",
  },
  {
    label: "Ouled Attia",
    value: "ouled_attia",
    wilaya: "skikda",
  },
  {
    label: "Oued Zhour",
    value: "oued_zhour",
    wilaya: "skikda",
  },
  {
    label: "Collo",
    value: "collo",
    wilaya: "skikda",
  },
  {
    label: "Cheraia",
    value: "cheraia",
    wilaya: "skikda",
  },
  {
    label: "Beni Zid",
    value: "beni_zid",
    wilaya: "skikda",
  },
  {
    label: "Khenag Maoune",
    value: "khenag_maoune",
    wilaya: "skikda",
  },
  {
    label: "El Marsa",
    value: "el_marsa",
    wilaya: "skikda",
  },
  {
    label: "Ben Azzouz",
    value: "ben_azzouz",
    wilaya: "skikda",
  },
  {
    label: "Bekkouche Lakhdar",
    value: "bekkouche_lakhdar",
    wilaya: "skikda",
  },
  {
    label: "Es Sebt",
    value: "es_sebt",
    wilaya: "skikda",
  },
  {
    label: "Ain Charchar",
    value: "ain_charchar",
    wilaya: "skikda",
  },
  {
    label: "Azzaba",
    value: "azzaba",
    wilaya: "skikda",
  },
  {
    label: "Bouchetata",
    value: "bouchetata",
    wilaya: "skikda",
  },
  {
    label: "Filfila",
    value: "filfila",
    wilaya: "skikda",
  },
  {
    label: "Hammadi Krouma",
    value: "hammadi_krouma",
    wilaya: "skikda",
  },
  {
    label: "Skikda",
    value: "skikda",
    wilaya: "skikda",
  },
  {
    label: "Ain Zouit",
    value: "ain_zouit",
    wilaya: "skikda",
  },
  {
    label: "Djendel Saadi Mohamed",
    value: "djendel_saadi_mohamed",
    wilaya: "skikda",
  },
  {
    label: "Kanoua",
    value: "kanoua",
    wilaya: "skikda",
  },
  {
    label: "Sidi Ali Benyoub",
    value: "sidi_ali_benyoub",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Moulay Slissen",
    value: "moulay_slissen",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "El Hacaiba",
    value: "el_hacaiba",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Ain Tindamine",
    value: "ain_tindamine",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Tenira",
    value: "tenira",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Oued Sefioun",
    value: "oued_sefioun",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Hassi Dahou",
    value: "hassi_dahou",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Oued Taourira",
    value: "oued_taourira",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Benachiba Chelia",
    value: "benachiba_chelia",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Sidi Yacoub",
    value: "sidi_yacoub",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Sidi Lahcene",
    value: "sidi_lahcene",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Sidi Khaled",
    value: "sidi_khaled",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Tabia",
    value: "tabia",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Sidi Brahim",
    value: "sidi_brahim",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Amarnas",
    value: "amarnas",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Boukhanefis",
    value: "boukhanefis",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Hassi Zahana",
    value: "hassi_zahana",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Chetouane Belaila",
    value: "chetouane_belaila",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Ben Badis",
    value: "ben_badis",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Bedrabine El Mokrani",
    value: "bedrabine_el_mokrani",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Sfisef",
    value: "sfisef",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "M'cid",
    value: "m'cid",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Boudjebaa El Bordj",
    value: "boudjebaa_el_bordj",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Ain- Adden",
    value: "ain-_adden",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Sidi Hamadouche",
    value: "sidi_hamadouche",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Sidi Chaib",
    value: "sidi_chaib",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Makedra",
    value: "makedra",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Ain El Berd",
    value: "ain_el_berd",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Redjem Demouche",
    value: "redjem_demouche",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Ras El Ma",
    value: "ras_el_ma",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Oued Sebaa",
    value: "oued_sebaa",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Marhoum",
    value: "marhoum",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Sidi Bel-Abbes",
    value: "sidi_bel-abbes",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Ain Thrid",
    value: "ain_thrid",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Sehala Thaoura",
    value: "sehala_thaoura",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Tessala",
    value: "tessala",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Belarbi",
    value: "belarbi",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Mostefa  Ben Brahim",
    value: "mostefa__ben_brahim",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Tilmouni",
    value: "tilmouni",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Zerouala",
    value: "zerouala",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Dhaya",
    value: "dhaya",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Mezaourou",
    value: "mezaourou",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Teghalimet",
    value: "teghalimet",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Telagh",
    value: "telagh",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Ain Kada",
    value: "ain_kada",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Lamtar",
    value: "lamtar",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Sidi Ali Boussidi",
    value: "sidi_ali_boussidi",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Sidi Dahou Zairs",
    value: "sidi_dahou_zairs",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Bir El Hammam",
    value: "bir_el_hammam",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Merine",
    value: "merine",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Tefessour",
    value: "tefessour",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Taoudmout",
    value: "taoudmout",
    wilaya: "sidi_bel_abb\u00e8s",
  },
  {
    label: "Annaba",
    value: "annaba",
    wilaya: "annaba",
  },
  {
    label: "Seraidi",
    value: "seraidi",
    wilaya: "annaba",
  },
  {
    label: "Berrahal",
    value: "berrahal",
    wilaya: "annaba",
  },
  {
    label: "Oued El Aneb",
    value: "oued_el_aneb",
    wilaya: "annaba",
  },
  {
    label: "El Hadjar",
    value: "el_hadjar",
    wilaya: "annaba",
  },
  {
    label: "Sidi Amar",
    value: "sidi_amar",
    wilaya: "annaba",
  },
  {
    label: "El Bouni",
    value: "el_bouni",
    wilaya: "annaba",
  },
  {
    label: "Ain El Berda",
    value: "ain_el_berda",
    wilaya: "annaba",
  },
  {
    label: "Cheurfa",
    value: "cheurfa",
    wilaya: "annaba",
  },
  {
    label: "El Eulma",
    value: "el_eulma",
    wilaya: "annaba",
  },
  {
    label: "Treat",
    value: "treat",
    wilaya: "annaba",
  },
  {
    label: "Chetaibi",
    value: "chetaibi",
    wilaya: "annaba",
  },
  {
    label: "Nechmaya",
    value: "nechmaya",
    wilaya: "guelma",
  },
  {
    label: "Bou Hamdane",
    value: "bou_hamdane",
    wilaya: "guelma",
  },
  {
    label: "Hammam Debagh",
    value: "hammam_debagh",
    wilaya: "guelma",
  },
  {
    label: "Roknia",
    value: "roknia",
    wilaya: "guelma",
  },
  {
    label: "Dahouara",
    value: "dahouara",
    wilaya: "guelma",
  },
  {
    label: "Hammam N'bail",
    value: "hammam_n'bail",
    wilaya: "guelma",
  },
  {
    label: "Guelma",
    value: "guelma",
    wilaya: "guelma",
  },
  {
    label: "Boumahra Ahmed",
    value: "boumahra_ahmed",
    wilaya: "guelma",
  },
  {
    label: "Ain Ben Beida",
    value: "ain_ben_beida",
    wilaya: "guelma",
  },
  {
    label: "Bouchegouf",
    value: "bouchegouf",
    wilaya: "guelma",
  },
  {
    label: "Medjez Sfa",
    value: "medjez_sfa",
    wilaya: "guelma",
  },
  {
    label: "Oued Ferragha",
    value: "oued_ferragha",
    wilaya: "guelma",
  },
  {
    label: "Bouati Mahmoud",
    value: "bouati_mahmoud",
    wilaya: "guelma",
  },
  {
    label: "El Fedjoudj",
    value: "el_fedjoudj",
    wilaya: "guelma",
  },
  {
    label: "Heliopolis",
    value: "heliopolis",
    wilaya: "guelma",
  },
  {
    label: "Medjez Amar",
    value: "medjez_amar",
    wilaya: "guelma",
  },
  {
    label: "Houari Boumedienne",
    value: "houari_boumedienne",
    wilaya: "guelma",
  },
  {
    label: "Ras El Agba",
    value: "ras_el_agba",
    wilaya: "guelma",
  },
  {
    label: "Sellaoua Announa",
    value: "sellaoua_announa",
    wilaya: "guelma",
  },
  {
    label: "Djeballah Khemissi",
    value: "djeballah_khemissi",
    wilaya: "guelma",
  },
  {
    label: "Bordj Sabath",
    value: "bordj_sabath",
    wilaya: "guelma",
  },
  {
    label: "Oued Zenati",
    value: "oued_zenati",
    wilaya: "guelma",
  },
  {
    label: "Ain Regada",
    value: "ain_regada",
    wilaya: "guelma",
  },
  {
    label: "Ain Larbi",
    value: "ain_larbi",
    wilaya: "guelma",
  },
  {
    label: "Ain Makhlouf",
    value: "ain_makhlouf",
    wilaya: "guelma",
  },
  {
    label: "Tamlouka",
    value: "tamlouka",
    wilaya: "guelma",
  },
  {
    label: "Ain Sandel",
    value: "ain_sandel",
    wilaya: "guelma",
  },
  {
    label: "Bou Hachana",
    value: "bou_hachana",
    wilaya: "guelma",
  },
  {
    label: "Khezaras",
    value: "khezaras",
    wilaya: "guelma",
  },
  {
    label: "Belkheir",
    value: "belkheir",
    wilaya: "guelma",
  },
  {
    label: "Beni Mezline",
    value: "beni_mezline",
    wilaya: "guelma",
  },
  {
    label: "Guelaat Bou Sbaa",
    value: "guelaat_bou_sbaa",
    wilaya: "guelma",
  },
  {
    label: "Oued Cheham",
    value: "oued_cheham",
    wilaya: "guelma",
  },
  {
    label: "Bendjarah",
    value: "bendjarah",
    wilaya: "guelma",
  },
  {
    label: "Didouche Mourad",
    value: "didouche_mourad",
    wilaya: "constantine",
  },
  {
    label: "Hamma Bouziane",
    value: "hamma_bouziane",
    wilaya: "constantine",
  },
  {
    label: "Beni Hamidane",
    value: "beni_hamidane",
    wilaya: "constantine",
  },
  {
    label: "Zighoud Youcef",
    value: "zighoud_youcef",
    wilaya: "constantine",
  },
  {
    label: "Ain Smara",
    value: "ain_smara",
    wilaya: "constantine",
  },
  {
    label: "El Khroub",
    value: "el_khroub",
    wilaya: "constantine",
  },
  {
    label: "Ouled Rahmoun",
    value: "ouled_rahmoun",
    wilaya: "constantine",
  },
  {
    label: "Ain Abid",
    value: "ain_abid",
    wilaya: "constantine",
  },
  {
    label: "Ben Badis",
    value: "ben_badis",
    wilaya: "constantine",
  },
  {
    label: "Ibn Ziad",
    value: "ibn_ziad",
    wilaya: "constantine",
  },
  {
    label: "Messaoud Boudjeriou",
    value: "messaoud_boudjeriou",
    wilaya: "constantine",
  },
  {
    label: "Constantine",
    value: "constantine",
    wilaya: "constantine",
  },
  {
    label: "Ouled Hellal",
    value: "ouled_hellal",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Souagui",
    value: "souagui",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Ksar El Boukhari",
    value: "ksar_el_boukhari",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "M'fatha",
    value: "m'fatha",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Saneg",
    value: "saneg",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "El Azizia",
    value: "el_azizia",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Maghraoua",
    value: "maghraoua",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Mihoub",
    value: "mihoub",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Bouaiche",
    value: "bouaiche",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Boughzoul",
    value: "boughzoul",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Chabounia",
    value: "chabounia",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Hannacha",
    value: "hannacha",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Ouamri",
    value: "ouamri",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Oued Harbil",
    value: "oued_harbil",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Beni Slimane",
    value: "beni_slimane",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Bouaichoune",
    value: "bouaichoune",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Ouled Bouachra",
    value: "ouled_bouachra",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Si Mahdjoub",
    value: "si_mahdjoub",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Bouskene",
    value: "bouskene",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Sidi Rabie",
    value: "sidi_rabie",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Berrouaghia",
    value: "berrouaghia",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Ouled Deid",
    value: "ouled_deid",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Rebaia",
    value: "rebaia",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Medjebar",
    value: "medjebar",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Tletat Ed Douair",
    value: "tletat_ed_douair",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Zoubiria",
    value: "zoubiria",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Aissaouia",
    value: "aissaouia",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "El Haoudane",
    value: "el_haoudane",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Mezerana",
    value: "mezerana",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Tablat",
    value: "tablat",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Boghar",
    value: "boghar",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Seghouane",
    value: "seghouane",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Draa Esmar",
    value: "draa_esmar",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Medea",
    value: "medea",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Tamesguida",
    value: "tamesguida",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Ben Chicao",
    value: "ben_chicao",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "El Hamdania",
    value: "el_hamdania",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Ouzera",
    value: "ouzera",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Tizi Mahdi",
    value: "tizi_mahdi",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Ain Boucif",
    value: "ain_boucif",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "El Ouinet",
    value: "el_ouinet",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Kef Lakhdar",
    value: "kef_lakhdar",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Ouled Emaaraf",
    value: "ouled_emaaraf",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Sidi Demed",
    value: "sidi_demed",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Baata",
    value: "baata",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "El Omaria",
    value: "el_omaria",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Ouled Brahim",
    value: "ouled_brahim",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Bir Ben Laabed",
    value: "bir_ben_laabed",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "El Guelbelkebir",
    value: "el_guelbelkebir",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Sedraya",
    value: "sedraya",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Ain Ouksir",
    value: "ain_ouksir",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Chelalet El Adhaoura",
    value: "chelalet_el_adhaoura",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Cheniguel",
    value: "cheniguel",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Tafraout",
    value: "tafraout",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Bouchrahil",
    value: "bouchrahil",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Khams Djouamaa",
    value: "khams_djouamaa",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Sidi Naamane",
    value: "sidi_naamane",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Aziz",
    value: "aziz",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Derrag",
    value: "derrag",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Oum El Djellil",
    value: "oum_el_djellil",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Djouab",
    value: "djouab",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Sidi Zahar",
    value: "sidi_zahar",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Sidi Ziane",
    value: "sidi_ziane",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Ouled Antar",
    value: "ouled_antar",
    wilaya: "m\u00e9d\u00e9a",
  },
  {
    label: "Fornaka",
    value: "fornaka",
    wilaya: "mostaganem",
  },
  {
    label: "Oued El Kheir",
    value: "oued_el_kheir",
    wilaya: "mostaganem",
  },
  {
    label: "Hassiane",
    value: "hassiane",
    wilaya: "mostaganem",
  },
  {
    label: "Hassi Mameche",
    value: "hassi_mameche",
    wilaya: "mostaganem",
  },
  {
    label: "Mazagran",
    value: "mazagran",
    wilaya: "mostaganem",
  },
  {
    label: "Stidia",
    value: "stidia",
    wilaya: "mostaganem",
  },
  {
    label: "Ain-Tedles",
    value: "ain-tedles",
    wilaya: "mostaganem",
  },
  {
    label: "Sidi Belaattar",
    value: "sidi_belaattar",
    wilaya: "mostaganem",
  },
  {
    label: "Sour",
    value: "sour",
    wilaya: "mostaganem",
  },
  {
    label: "Ain-Boudinar",
    value: "ain-boudinar",
    wilaya: "mostaganem",
  },
  {
    label: "Kheir-Eddine",
    value: "kheir-eddine",
    wilaya: "mostaganem",
  },
  {
    label: "Sayada",
    value: "sayada",
    wilaya: "mostaganem",
  },
  {
    label: "Sidi Ali",
    value: "sidi_ali",
    wilaya: "mostaganem",
  },
  {
    label: "Tazgait",
    value: "tazgait",
    wilaya: "mostaganem",
  },
  {
    label: "Benabdelmalek Ramdane",
    value: "benabdelmalek_ramdane",
    wilaya: "mostaganem",
  },
  {
    label: "Mostaganem",
    value: "mostaganem",
    wilaya: "mostaganem",
  },
  {
    label: "Hadjadj",
    value: "hadjadj",
    wilaya: "mostaganem",
  },
  {
    label: "Sidi-Lakhdar",
    value: "sidi-lakhdar",
    wilaya: "mostaganem",
  },
  {
    label: "Achaacha",
    value: "achaacha",
    wilaya: "mostaganem",
  },
  {
    label: "Khadra",
    value: "khadra",
    wilaya: "mostaganem",
  },
  {
    label: "Nekmaria",
    value: "nekmaria",
    wilaya: "mostaganem",
  },
  {
    label: "Ouled Boughalem",
    value: "ouled_boughalem",
    wilaya: "mostaganem",
  },
  {
    label: "Bouguirat",
    value: "bouguirat",
    wilaya: "mostaganem",
  },
  {
    label: "Safsaf",
    value: "safsaf",
    wilaya: "mostaganem",
  },
  {
    label: "Sirat",
    value: "sirat",
    wilaya: "mostaganem",
  },
  {
    label: "Souaflia",
    value: "souaflia",
    wilaya: "mostaganem",
  },
  {
    label: "Ain-Sidi Cherif",
    value: "ain-sidi_cherif",
    wilaya: "mostaganem",
  },
  {
    label: "Mansourah",
    value: "mansourah",
    wilaya: "mostaganem",
  },
  {
    label: "Mesra",
    value: "mesra",
    wilaya: "mostaganem",
  },
  {
    label: "Touahria",
    value: "touahria",
    wilaya: "mostaganem",
  },
  {
    label: "Ain-Nouissy",
    value: "ain-nouissy",
    wilaya: "mostaganem",
  },
  {
    label: "Ouled-Maalah",
    value: "ouled-maalah",
    wilaya: "mostaganem",
  },
  {
    label: "Chellal",
    value: "chellal",
    wilaya: "m'sila",
  },
  {
    label: "Ouled Madhi",
    value: "ouled_madhi",
    wilaya: "m'sila",
  },
  {
    label: "Khettouti Sed-El-Jir",
    value: "khettouti_sed-el-jir",
    wilaya: "m'sila",
  },
  {
    label: "Belaiba",
    value: "belaiba",
    wilaya: "m'sila",
  },
  {
    label: "Berhoum",
    value: "berhoum",
    wilaya: "m'sila",
  },
  {
    label: "Dehahna",
    value: "dehahna",
    wilaya: "m'sila",
  },
  {
    label: "Magra",
    value: "magra",
    wilaya: "m'sila",
  },
  {
    label: "Beni Ilmane",
    value: "beni_ilmane",
    wilaya: "m'sila",
  },
  {
    label: "Bouti Sayeh",
    value: "bouti_sayeh",
    wilaya: "m'sila",
  },
  {
    label: "Sidi Aissa",
    value: "sidi_aissa",
    wilaya: "m'sila",
  },
  {
    label: "Ain El Hadjel",
    value: "ain_el_hadjel",
    wilaya: "m'sila",
  },
  {
    label: "Sidi Hadjeres",
    value: "sidi_hadjeres",
    wilaya: "m'sila",
  },
  {
    label: "Bou Saada",
    value: "bou_saada",
    wilaya: "m'sila",
  },
  {
    label: "El Hamel",
    value: "el_hamel",
    wilaya: "m'sila",
  },
  {
    label: "Oulteme",
    value: "oulteme",
    wilaya: "m'sila",
  },
  {
    label: "Benzouh",
    value: "benzouh",
    wilaya: "m'sila",
  },
  {
    label: "Ouled Sidi Brahim",
    value: "ouled_sidi_brahim",
    wilaya: "m'sila",
  },
  {
    label: "Sidi Ameur",
    value: "sidi_ameur",
    wilaya: "m'sila",
  },
  {
    label: "Tamsa",
    value: "tamsa",
    wilaya: "m'sila",
  },
  {
    label: "Ben Srour",
    value: "ben_srour",
    wilaya: "m'sila",
  },
  {
    label: "Mohamed Boudiaf",
    value: "mohamed_boudiaf",
    wilaya: "m'sila",
  },
  {
    label: "Ouled Slimane",
    value: "ouled_slimane",
    wilaya: "m'sila",
  },
  {
    label: "Zarzour",
    value: "zarzour",
    wilaya: "m'sila",
  },
  {
    label: "Ain El Melh",
    value: "ain_el_melh",
    wilaya: "m'sila",
  },
  {
    label: "Ain Fares",
    value: "ain_fares",
    wilaya: "m'sila",
  },
  {
    label: "Ain Rich",
    value: "ain_rich",
    wilaya: "m'sila",
  },
  {
    label: "Bir Foda",
    value: "bir_foda",
    wilaya: "m'sila",
  },
  {
    label: "Sidi M'hamed",
    value: "sidi_m'hamed",
    wilaya: "m'sila",
  },
  {
    label: "Medjedel",
    value: "medjedel",
    wilaya: "m'sila",
  },
  {
    label: "Menaa",
    value: "menaa",
    wilaya: "m'sila",
  },
  {
    label: "Djebel Messaad",
    value: "djebel_messaad",
    wilaya: "m'sila",
  },
  {
    label: "Slim",
    value: "slim",
    wilaya: "m'sila",
  },
  {
    label: "M'sila",
    value: "m'sila",
    wilaya: "m'sila",
  },
  {
    label: "Hammam Dalaa",
    value: "hammam_dalaa",
    wilaya: "m'sila",
  },
  {
    label: "Ouanougha",
    value: "ouanougha",
    wilaya: "m'sila",
  },
  {
    label: "Ouled Mansour",
    value: "ouled_mansour",
    wilaya: "m'sila",
  },
  {
    label: "Tarmount",
    value: "tarmount",
    wilaya: "m'sila",
  },
  {
    label: "Maadid",
    value: "maadid",
    wilaya: "m'sila",
  },
  {
    label: "M'tarfa",
    value: "m'tarfa",
    wilaya: "m'sila",
  },
  {
    label: "Maarif",
    value: "maarif",
    wilaya: "m'sila",
  },
  {
    label: "Ouled Derradj",
    value: "ouled_derradj",
    wilaya: "m'sila",
  },
  {
    label: "Souamaa",
    value: "souamaa",
    wilaya: "m'sila",
  },
  {
    label: "El Houamed",
    value: "el_houamed",
    wilaya: "m'sila",
  },
  {
    label: "Khoubana",
    value: "khoubana",
    wilaya: "m'sila",
  },
  {
    label: "M'cif",
    value: "m'cif",
    wilaya: "m'sila",
  },
  {
    label: "Ain Khadra",
    value: "ain_khadra",
    wilaya: "m'sila",
  },
  {
    label: "Ouled Addi Guebala",
    value: "ouled_addi_guebala",
    wilaya: "m'sila",
  },
  {
    label: "Oued El Abtal",
    value: "oued_el_abtal",
    wilaya: "mascara",
  },
  {
    label: "Sidi Abdelmoumene",
    value: "sidi_abdelmoumene",
    wilaya: "mascara",
  },
  {
    label: "Sedjerara",
    value: "sedjerara",
    wilaya: "mascara",
  },
  {
    label: "Mohammadia",
    value: "mohammadia",
    wilaya: "mascara",
  },
  {
    label: "Tighennif",
    value: "tighennif",
    wilaya: "mascara",
  },
  {
    label: "Mocta-Douz",
    value: "mocta-douz",
    wilaya: "mascara",
  },
  {
    label: "Ferraguig",
    value: "ferraguig",
    wilaya: "mascara",
  },
  {
    label: "El Ghomri",
    value: "el_ghomri",
    wilaya: "mascara",
  },
  {
    label: "Zahana",
    value: "zahana",
    wilaya: "mascara",
  },
  {
    label: "El Gaada",
    value: "el_gaada",
    wilaya: "mascara",
  },
  {
    label: "Ras El Ain Amirouche",
    value: "ras_el_ain_amirouche",
    wilaya: "mascara",
  },
  {
    label: "Oggaz",
    value: "oggaz",
    wilaya: "mascara",
  },
  {
    label: "Alaimia",
    value: "alaimia",
    wilaya: "mascara",
  },
  {
    label: "Sig",
    value: "sig",
    wilaya: "mascara",
  },
  {
    label: "Chorfa",
    value: "chorfa",
    wilaya: "mascara",
  },
  {
    label: "Bou Henni",
    value: "bou_henni",
    wilaya: "mascara",
  },
  {
    label: "El Mamounia",
    value: "el_mamounia",
    wilaya: "mascara",
  },
  {
    label: "El Gueitena",
    value: "el_gueitena",
    wilaya: "mascara",
  },
  {
    label: "Ain Fares",
    value: "ain_fares",
    wilaya: "mascara",
  },
  {
    label: "Gharrous",
    value: "gharrous",
    wilaya: "mascara",
  },
  {
    label: "Benian",
    value: "benian",
    wilaya: "mascara",
  },
  {
    label: "Aouf",
    value: "aouf",
    wilaya: "mascara",
  },
  {
    label: "Guerdjoum",
    value: "guerdjoum",
    wilaya: "mascara",
  },
  {
    label: "Ain Frass",
    value: "ain_frass",
    wilaya: "mascara",
  },
  {
    label: "Ain Fekan",
    value: "ain_fekan",
    wilaya: "mascara",
  },
  {
    label: "Khalouia",
    value: "khalouia",
    wilaya: "mascara",
  },
  {
    label: "El Menaouer",
    value: "el_menaouer",
    wilaya: "mascara",
  },
  {
    label: "El Bordj",
    value: "el_bordj",
    wilaya: "mascara",
  },
  {
    label: "Sidi Boussaid",
    value: "sidi_boussaid",
    wilaya: "mascara",
  },
  {
    label: "Matemore",
    value: "matemore",
    wilaya: "mascara",
  },
  {
    label: "Sidi Kada",
    value: "sidi_kada",
    wilaya: "mascara",
  },
  {
    label: "Makhda",
    value: "makhda",
    wilaya: "mascara",
  },
  {
    label: "Mascara",
    value: "mascara",
    wilaya: "mascara",
  },
  {
    label: "Bouhanifia",
    value: "bouhanifia",
    wilaya: "mascara",
  },
  {
    label: "Ghriss",
    value: "ghriss",
    wilaya: "mascara",
  },
  {
    label: "Hacine",
    value: "hacine",
    wilaya: "mascara",
  },
  {
    label: "El Keurt",
    value: "el_keurt",
    wilaya: "mascara",
  },
  {
    label: "Froha",
    value: "froha",
    wilaya: "mascara",
  },
  {
    label: "Tizi",
    value: "tizi",
    wilaya: "mascara",
  },
  {
    label: "Sehailia",
    value: "sehailia",
    wilaya: "mascara",
  },
  {
    label: "Maoussa",
    value: "maoussa",
    wilaya: "mascara",
  },
  {
    label: "Sidi Abdeldjebar",
    value: "sidi_abdeldjebar",
    wilaya: "mascara",
  },
  {
    label: "El Hachem",
    value: "el_hachem",
    wilaya: "mascara",
  },
  {
    label: "Nesmot",
    value: "nesmot",
    wilaya: "mascara",
  },
  {
    label: "Zelamta",
    value: "zelamta",
    wilaya: "mascara",
  },
  {
    label: "Ain Ferah",
    value: "ain_ferah",
    wilaya: "mascara",
  },
  {
    label: "Oued Taria",
    value: "oued_taria",
    wilaya: "mascara",
  },
  {
    label: "Ouargla",
    value: "ouargla",
    wilaya: "ouargla",
  },
  {
    label: "Hassi Messaoud",
    value: "hassi_messaoud",
    wilaya: "ouargla",
  },
  {
    label: "Ain Beida",
    value: "ain_beida",
    wilaya: "ouargla",
  },
  {
    label: "Hassi Ben Abdellah",
    value: "hassi_ben_abdellah",
    wilaya: "ouargla",
  },
  {
    label: "Sidi Khouiled",
    value: "sidi_khouiled",
    wilaya: "ouargla",
  },
  {
    label: "El Borma",
    value: "el_borma",
    wilaya: "ouargla",
  },
  {
    label: "Rouissat",
    value: "rouissat",
    wilaya: "ouargla",
  },
  {
    label: "N'goussa",
    value: "n'goussa",
    wilaya: "ouargla",
  },
  {
    label: "Sidi Chami",
    value: "sidi_chami",
    wilaya: "oran",
  },
  {
    label: "Hassi Mefsoukh",
    value: "hassi_mefsoukh",
    wilaya: "oran",
  },
  {
    label: "Bir El Djir",
    value: "bir_el_djir",
    wilaya: "oran",
  },
  {
    label: "Hassi Ben Okba",
    value: "hassi_ben_okba",
    wilaya: "oran",
  },
  {
    label: "Gdyel",
    value: "gdyel",
    wilaya: "oran",
  },
  {
    label: "Hassi Bounif",
    value: "hassi_bounif",
    wilaya: "oran",
  },
  {
    label: "El Kerma",
    value: "el_kerma",
    wilaya: "oran",
  },
  {
    label: "Es Senia",
    value: "es_senia",
    wilaya: "oran",
  },
  {
    label: "Ben Freha",
    value: "ben_freha",
    wilaya: "oran",
  },
  {
    label: "Arzew",
    value: "arzew",
    wilaya: "oran",
  },
  {
    label: "Sidi Ben Yebka",
    value: "sidi_ben_yebka",
    wilaya: "oran",
  },
  {
    label: "Ain Biya",
    value: "ain_biya",
    wilaya: "oran",
  },
  {
    label: "Bethioua",
    value: "bethioua",
    wilaya: "oran",
  },
  {
    label: "Marsat El Hadjadj",
    value: "marsat_el_hadjadj",
    wilaya: "oran",
  },
  {
    label: "Ain Turk",
    value: "ain_turk",
    wilaya: "oran",
  },
  {
    label: "Oran",
    value: "oran",
    wilaya: "oran",
  },
  {
    label: "El Ancor",
    value: "el_ancor",
    wilaya: "oran",
  },
  {
    label: "Mers El Kebir",
    value: "mers_el_kebir",
    wilaya: "oran",
  },
  {
    label: "Boufatis",
    value: "boufatis",
    wilaya: "oran",
  },
  {
    label: "El Braya",
    value: "el_braya",
    wilaya: "oran",
  },
  {
    label: "Oued Tlelat",
    value: "oued_tlelat",
    wilaya: "oran",
  },
  {
    label: "Ain Kerma",
    value: "ain_kerma",
    wilaya: "oran",
  },
  {
    label: "Boutlelis",
    value: "boutlelis",
    wilaya: "oran",
  },
  {
    label: "Messerghin",
    value: "messerghin",
    wilaya: "oran",
  },
  {
    label: "Bousfer",
    value: "bousfer",
    wilaya: "oran",
  },
  {
    label: "Tafraoui",
    value: "tafraoui",
    wilaya: "oran",
  },
  {
    label: "Ain El Orak",
    value: "ain_el_orak",
    wilaya: "el_bayadh",
  },
  {
    label: "Krakda",
    value: "krakda",
    wilaya: "el_bayadh",
  },
  {
    label: "Sidi Slimane",
    value: "sidi_slimane",
    wilaya: "el_bayadh",
  },
  {
    label: "Sidi Ameur",
    value: "sidi_ameur",
    wilaya: "el_bayadh",
  },
  {
    label: "Boualem",
    value: "boualem",
    wilaya: "el_bayadh",
  },
  {
    label: "El Bnoud",
    value: "el_bnoud",
    wilaya: "el_bayadh",
  },
  {
    label: "Bougtoub",
    value: "bougtoub",
    wilaya: "el_bayadh",
  },
  {
    label: "El Kheiter",
    value: "el_kheiter",
    wilaya: "el_bayadh",
  },
  {
    label: "Tousmouline",
    value: "tousmouline",
    wilaya: "el_bayadh",
  },
  {
    label: "Sidi Tiffour",
    value: "sidi_tiffour",
    wilaya: "el_bayadh",
  },
  {
    label: "Stitten",
    value: "stitten",
    wilaya: "el_bayadh",
  },
  {
    label: "El Bayadh",
    value: "el_bayadh",
    wilaya: "el_bayadh",
  },
  {
    label: "Rogassa",
    value: "rogassa",
    wilaya: "el_bayadh",
  },
  {
    label: "El Mehara",
    value: "el_mehara",
    wilaya: "el_bayadh",
  },
  {
    label: "Kef El Ahmar",
    value: "kef_el_ahmar",
    wilaya: "el_bayadh",
  },
  {
    label: "Brezina",
    value: "brezina",
    wilaya: "el_bayadh",
  },
  {
    label: "Ghassoul",
    value: "ghassoul",
    wilaya: "el_bayadh",
  },
  {
    label: "Labiodh Sidi Cheikh",
    value: "labiodh_sidi_cheikh",
    wilaya: "el_bayadh",
  },
  {
    label: "Boussemghoun",
    value: "boussemghoun",
    wilaya: "el_bayadh",
  },
  {
    label: "Cheguig",
    value: "cheguig",
    wilaya: "el_bayadh",
  },
  {
    label: "Chellala",
    value: "chellala",
    wilaya: "el_bayadh",
  },
  {
    label: "Arbaouat",
    value: "arbaouat",
    wilaya: "el_bayadh",
  },
  {
    label: "Bordj Omar Driss",
    value: "bordj_omar_driss",
    wilaya: "illizi",
  },
  {
    label: "Debdeb",
    value: "debdeb",
    wilaya: "illizi",
  },
  {
    label: "In Amenas",
    value: "in_amenas",
    wilaya: "illizi",
  },
  {
    label: "Illizi",
    value: "illizi",
    wilaya: "illizi",
  },
  {
    label: "Elhammadia",
    value: "elhammadia",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Ouled Sidi-Brahim",
    value: "ouled_sidi-brahim",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Ain Taghrout",
    value: "ain_taghrout",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Tixter",
    value: "tixter",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Belimour",
    value: "belimour",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "El Annasseur",
    value: "el_annasseur",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Ghailasa",
    value: "ghailasa",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Taglait",
    value: "taglait",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Bordj Ghedir",
    value: "bordj_ghedir",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "El Euch",
    value: "el_euch",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Sidi-Embarek",
    value: "sidi-embarek",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Khelil",
    value: "khelil",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Bir Kasdali",
    value: "bir_kasdali",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Tefreg",
    value: "tefreg",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "El Main",
    value: "el_main",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Djaafra",
    value: "djaafra",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Colla",
    value: "colla",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Teniet En Nasr",
    value: "teniet_en_nasr",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "El M'hir",
    value: "el_m'hir",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Ksour",
    value: "ksour",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Mansoura",
    value: "mansoura",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Haraza",
    value: "haraza",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Rabta",
    value: "rabta",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "El Achir",
    value: "el_achir",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Hasnaoua",
    value: "hasnaoua",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Medjana",
    value: "medjana",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Ain Tesra",
    value: "ain_tesra",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Ouled Brahem",
    value: "ouled_brahem",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Ras El Oued",
    value: "ras_el_oued",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Bordj Zemmoura",
    value: "bordj_zemmoura",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Ouled Dahmane",
    value: "ouled_dahmane",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Tassamert",
    value: "tassamert",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "B. B. Arreridj",
    value: "b._b._arreridj",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "Ben Daoud",
    value: "ben_daoud",
    wilaya: "bordj_bou_arreridj",
  },
  {
    label: "El Kharrouba",
    value: "el_kharrouba",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Dellys",
    value: "dellys",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Ben Choud",
    value: "ben_choud",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Afir",
    value: "afir",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Thenia",
    value: "thenia",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Beni Amrane",
    value: "beni_amrane",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Khemis El Khechna",
    value: "khemis_el_khechna",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Ammal",
    value: "ammal",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Timezrit",
    value: "timezrit",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Zemmouri",
    value: "zemmouri",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Larbatache",
    value: "larbatache",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Isser",
    value: "isser",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Chabet El Ameur",
    value: "chabet_el_ameur",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Ouled Aissa",
    value: "ouled_aissa",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Naciria",
    value: "naciria",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Bouzegza Keddara",
    value: "bouzegza_keddara",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Souk El Had",
    value: "souk_el_had",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Sidi Daoud",
    value: "sidi_daoud",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Baghlia",
    value: "baghlia",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Leghata",
    value: "leghata",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Djinet",
    value: "djinet",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Tidjelabine",
    value: "tidjelabine",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Si Mustapha",
    value: "si_mustapha",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Ouled Hedadj",
    value: "ouled_hedadj",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Ouled Moussa",
    value: "ouled_moussa",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Boumerdes",
    value: "boumerdes",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Corso",
    value: "corso",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Bordj Menaiel",
    value: "bordj_menaiel",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Boudouaou",
    value: "boudouaou",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Boudouaou El Bahri",
    value: "boudouaou_el_bahri",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Taourga",
    value: "taourga",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Hammedi",
    value: "hammedi",
    wilaya: "boumerd\u00e8s",
  },
  {
    label: "Ain El Assel",
    value: "ain_el_assel",
    wilaya: "el_tarf",
  },
  {
    label: "Bougous",
    value: "bougous",
    wilaya: "el_tarf",
  },
  {
    label: "El Tarf",
    value: "el_tarf",
    wilaya: "el_tarf",
  },
  {
    label: "Zitouna",
    value: "zitouna",
    wilaya: "el_tarf",
  },
  {
    label: "Besbes",
    value: "besbes",
    wilaya: "el_tarf",
  },
  {
    label: "Ain Kerma",
    value: "ain_kerma",
    wilaya: "el_tarf",
  },
  {
    label: "Bouhadjar",
    value: "bouhadjar",
    wilaya: "el_tarf",
  },
  {
    label: "Hammam Beni Salah",
    value: "hammam_beni_salah",
    wilaya: "el_tarf",
  },
  {
    label: "Oued Zitoun",
    value: "oued_zitoun",
    wilaya: "el_tarf",
  },
  {
    label: "Ben M Hidi",
    value: "ben_m_hidi",
    wilaya: "el_tarf",
  },
  {
    label: "Berrihane",
    value: "berrihane",
    wilaya: "el_tarf",
  },
  {
    label: "Chebaita Mokhtar",
    value: "chebaita_mokhtar",
    wilaya: "el_tarf",
  },
  {
    label: "Echatt",
    value: "echatt",
    wilaya: "el_tarf",
  },
  {
    label: "El Aioun",
    value: "el_aioun",
    wilaya: "el_tarf",
  },
  {
    label: "El Kala",
    value: "el_kala",
    wilaya: "el_tarf",
  },
  {
    label: "Souarekh",
    value: "souarekh",
    wilaya: "el_tarf",
  },
  {
    label: "Zerizer",
    value: "zerizer",
    wilaya: "el_tarf",
  },
  {
    label: "Bouteldja",
    value: "bouteldja",
    wilaya: "el_tarf",
  },
  {
    label: "Chefia",
    value: "chefia",
    wilaya: "el_tarf",
  },
  {
    label: "Lac Des Oiseaux",
    value: "lac_des_oiseaux",
    wilaya: "el_tarf",
  },
  {
    label: "Chihani",
    value: "chihani",
    wilaya: "el_tarf",
  },
  {
    label: "Raml Souk",
    value: "raml_souk",
    wilaya: "el_tarf",
  },
  {
    label: "Asfour",
    value: "asfour",
    wilaya: "el_tarf",
  },
  {
    label: "Drean",
    value: "drean",
    wilaya: "el_tarf",
  },
  {
    label: "Tindouf",
    value: "tindouf",
    wilaya: "tindouf",
  },
  {
    label: "Oum El Assel",
    value: "oum_el_assel",
    wilaya: "tindouf",
  },
  {
    label: "Khemisti",
    value: "khemisti",
    wilaya: "tissemsilt",
  },
  {
    label: "Theniet El Had",
    value: "theniet_el_had",
    wilaya: "tissemsilt",
  },
  {
    label: "Ouled Bessam",
    value: "ouled_bessam",
    wilaya: "tissemsilt",
  },
  {
    label: "Sidi Boutouchent",
    value: "sidi_boutouchent",
    wilaya: "tissemsilt",
  },
  {
    label: "Tissemsilt",
    value: "tissemsilt",
    wilaya: "tissemsilt",
  },
  {
    label: "Sidi Lantri",
    value: "sidi_lantri",
    wilaya: "tissemsilt",
  },
  {
    label: "Beni Chaib",
    value: "beni_chaib",
    wilaya: "tissemsilt",
  },
  {
    label: "Beni Lahcene",
    value: "beni_lahcene",
    wilaya: "tissemsilt",
  },
  {
    label: "Sidi Abed",
    value: "sidi_abed",
    wilaya: "tissemsilt",
  },
  {
    label: "Sidi Slimane",
    value: "sidi_slimane",
    wilaya: "tissemsilt",
  },
  {
    label: "Boucaid",
    value: "boucaid",
    wilaya: "tissemsilt",
  },
  {
    label: "Larbaa",
    value: "larbaa",
    wilaya: "tissemsilt",
  },
  {
    label: "Lazharia",
    value: "lazharia",
    wilaya: "tissemsilt",
  },
  {
    label: "Lardjem",
    value: "lardjem",
    wilaya: "tissemsilt",
  },
  {
    label: "Melaab",
    value: "melaab",
    wilaya: "tissemsilt",
  },
  {
    label: "Layoune",
    value: "layoune",
    wilaya: "tissemsilt",
  },
  {
    label: "Tamellahet",
    value: "tamellahet",
    wilaya: "tissemsilt",
  },
  {
    label: "Youssoufia",
    value: "youssoufia",
    wilaya: "tissemsilt",
  },
  {
    label: "Bordj El Emir Abdelkader",
    value: "bordj_el_emir_abdelkader",
    wilaya: "tissemsilt",
  },
  {
    label: "Ammari",
    value: "ammari",
    wilaya: "tissemsilt",
  },
  {
    label: "Maacem",
    value: "maacem",
    wilaya: "tissemsilt",
  },
  {
    label: "Bordj Bounaama",
    value: "bordj_bounaama",
    wilaya: "tissemsilt",
  },
  {
    label: "Douar El Maa",
    value: "douar_el_maa",
    wilaya: "el_oued",
  },
  {
    label: "El Ogla",
    value: "el_ogla",
    wilaya: "el_oued",
  },
  {
    label: "Magrane",
    value: "magrane",
    wilaya: "el_oued",
  },
  {
    label: "Sidi Aoun",
    value: "sidi_aoun",
    wilaya: "el_oued",
  },
  {
    label: "Mih Ouansa",
    value: "mih_ouansa",
    wilaya: "el_oued",
  },
  {
    label: "Kouinine",
    value: "kouinine",
    wilaya: "el_oued",
  },
  {
    label: "Bayadha",
    value: "bayadha",
    wilaya: "el_oued",
  },
  {
    label: "Nakhla",
    value: "nakhla",
    wilaya: "el_oued",
  },
  {
    label: "Robbah",
    value: "robbah",
    wilaya: "el_oued",
  },
  {
    label: "Guemar",
    value: "guemar",
    wilaya: "el_oued",
  },
  {
    label: "Ben Guecha",
    value: "ben_guecha",
    wilaya: "el_oued",
  },
  {
    label: "Ourmes",
    value: "ourmes",
    wilaya: "el_oued",
  },
  {
    label: "Taghzout",
    value: "taghzout",
    wilaya: "el_oued",
  },
  {
    label: "Hamraia",
    value: "hamraia",
    wilaya: "el_oued",
  },
  {
    label: "Reguiba",
    value: "reguiba",
    wilaya: "el_oued",
  },
  {
    label: "Debila",
    value: "debila",
    wilaya: "el_oued",
  },
  {
    label: "Hassani Abdelkrim",
    value: "hassani_abdelkrim",
    wilaya: "el_oued",
  },
  {
    label: "Hassi Khalifa",
    value: "hassi_khalifa",
    wilaya: "el_oued",
  },
  {
    label: "Trifaoui",
    value: "trifaoui",
    wilaya: "el_oued",
  },
  {
    label: "Taleb Larbi",
    value: "taleb_larbi",
    wilaya: "el_oued",
  },
  {
    label: "Oued El Alenda",
    value: "oued_el_alenda",
    wilaya: "el_oued",
  },
  {
    label: "El-Oued",
    value: "el-oued",
    wilaya: "el_oued",
  },
  {
    label: "Khirane",
    value: "khirane",
    wilaya: "khenchela",
  },
  {
    label: "Babar",
    value: "babar",
    wilaya: "khenchela",
  },
  {
    label: "El Mahmal",
    value: "el_mahmal",
    wilaya: "khenchela",
  },
  {
    label: "Ouled Rechache",
    value: "ouled_rechache",
    wilaya: "khenchela",
  },
  {
    label: "Djellal",
    value: "djellal",
    wilaya: "khenchela",
  },
  {
    label: "Yabous",
    value: "yabous",
    wilaya: "khenchela",
  },
  {
    label: "Khenchela",
    value: "khenchela",
    wilaya: "khenchela",
  },
  {
    label: "Kais",
    value: "kais",
    wilaya: "khenchela",
  },
  {
    label: "Chelia",
    value: "chelia",
    wilaya: "khenchela",
  },
  {
    label: "Remila",
    value: "remila",
    wilaya: "khenchela",
  },
  {
    label: "Taouzianat",
    value: "taouzianat",
    wilaya: "khenchela",
  },
  {
    label: "Baghai",
    value: "baghai",
    wilaya: "khenchela",
  },
  {
    label: "El Hamma",
    value: "el_hamma",
    wilaya: "khenchela",
  },
  {
    label: "Ensigha",
    value: "ensigha",
    wilaya: "khenchela",
  },
  {
    label: "Tamza",
    value: "tamza",
    wilaya: "khenchela",
  },
  {
    label: "Ain Touila",
    value: "ain_touila",
    wilaya: "khenchela",
  },
  {
    label: "M'toussa",
    value: "m'toussa",
    wilaya: "khenchela",
  },
  {
    label: "Bouhmama",
    value: "bouhmama",
    wilaya: "khenchela",
  },
  {
    label: "El Oueldja",
    value: "el_oueldja",
    wilaya: "khenchela",
  },
  {
    label: "M'sara",
    value: "m'sara",
    wilaya: "khenchela",
  },
  {
    label: "Chechar",
    value: "chechar",
    wilaya: "khenchela",
  },
  {
    label: "Souk Ahras",
    value: "souk_ahras",
    wilaya: "souk_ahras",
  },
  {
    label: "Ain Soltane",
    value: "ain_soltane",
    wilaya: "souk_ahras",
  },
  {
    label: "Sedrata",
    value: "sedrata",
    wilaya: "souk_ahras",
  },
  {
    label: "Hanencha",
    value: "hanencha",
    wilaya: "souk_ahras",
  },
  {
    label: "Machroha",
    value: "machroha",
    wilaya: "souk_ahras",
  },
  {
    label: "Ain Zana",
    value: "ain_zana",
    wilaya: "souk_ahras",
  },
  {
    label: "Ouled Driss",
    value: "ouled_driss",
    wilaya: "souk_ahras",
  },
  {
    label: "Terraguelt",
    value: "terraguelt",
    wilaya: "souk_ahras",
  },
  {
    label: "Oum El Adhaim",
    value: "oum_el_adhaim",
    wilaya: "souk_ahras",
  },
  {
    label: "Oued Kebrit",
    value: "oued_kebrit",
    wilaya: "souk_ahras",
  },
  {
    label: "Tiffech",
    value: "tiffech",
    wilaya: "souk_ahras",
  },
  {
    label: "Ragouba",
    value: "ragouba",
    wilaya: "souk_ahras",
  },
  {
    label: "Drea",
    value: "drea",
    wilaya: "souk_ahras",
  },
  {
    label: "Taoura",
    value: "taoura",
    wilaya: "souk_ahras",
  },
  {
    label: "Zaarouria",
    value: "zaarouria",
    wilaya: "souk_ahras",
  },
  {
    label: "Haddada",
    value: "haddada",
    wilaya: "souk_ahras",
  },
  {
    label: "Khedara",
    value: "khedara",
    wilaya: "souk_ahras",
  },
  {
    label: "Ouled Moumen",
    value: "ouled_moumen",
    wilaya: "souk_ahras",
  },
  {
    label: "Merahna",
    value: "merahna",
    wilaya: "souk_ahras",
  },
  {
    label: "Ouillen",
    value: "ouillen",
    wilaya: "souk_ahras",
  },
  {
    label: "Sidi Fredj",
    value: "sidi_fredj",
    wilaya: "souk_ahras",
  },
  {
    label: "Bir Bouhouche",
    value: "bir_bouhouche",
    wilaya: "souk_ahras",
  },
  {
    label: "Safel El Ouiden",
    value: "safel_el_ouiden",
    wilaya: "souk_ahras",
  },
  {
    label: "Khemissa",
    value: "khemissa",
    wilaya: "souk_ahras",
  },
  {
    label: "M'daourouche",
    value: "m'daourouche",
    wilaya: "souk_ahras",
  },
  {
    label: "Zouabi",
    value: "zouabi",
    wilaya: "souk_ahras",
  },
  {
    label: "Hadjout",
    value: "hadjout",
    wilaya: "tipaza",
  },
  {
    label: "Merad",
    value: "merad",
    wilaya: "tipaza",
  },
  {
    label: "Menaceur",
    value: "menaceur",
    wilaya: "tipaza",
  },
  {
    label: "Aghbal",
    value: "aghbal",
    wilaya: "tipaza",
  },
  {
    label: "Nador",
    value: "nador",
    wilaya: "tipaza",
  },
  {
    label: "Sidi-Amar",
    value: "sidi-amar",
    wilaya: "tipaza",
  },
  {
    label: "Gouraya",
    value: "gouraya",
    wilaya: "tipaza",
  },
  {
    label: "Messelmoun",
    value: "messelmoun",
    wilaya: "tipaza",
  },
  {
    label: "Cherchell",
    value: "cherchell",
    wilaya: "tipaza",
  },
  {
    label: "Hadjret Ennous",
    value: "hadjret_ennous",
    wilaya: "tipaza",
  },
  {
    label: "Sidi Ghiles",
    value: "sidi_ghiles",
    wilaya: "tipaza",
  },
  {
    label: "Damous",
    value: "damous",
    wilaya: "tipaza",
  },
  {
    label: "Larhat",
    value: "larhat",
    wilaya: "tipaza",
  },
  {
    label: "Fouka",
    value: "fouka",
    wilaya: "tipaza",
  },
  {
    label: "Ain Tagourait",
    value: "ain_tagourait",
    wilaya: "tipaza",
  },
  {
    label: "Bou Haroun",
    value: "bou_haroun",
    wilaya: "tipaza",
  },
  {
    label: "Bou Ismail",
    value: "bou_ismail",
    wilaya: "tipaza",
  },
  {
    label: "Khemisti",
    value: "khemisti",
    wilaya: "tipaza",
  },
  {
    label: "Ahmer El Ain",
    value: "ahmer_el_ain",
    wilaya: "tipaza",
  },
  {
    label: "Bourkika",
    value: "bourkika",
    wilaya: "tipaza",
  },
  {
    label: "Douaouda",
    value: "douaouda",
    wilaya: "tipaza",
  },
  {
    label: "Sidi Rached",
    value: "sidi_rached",
    wilaya: "tipaza",
  },
  {
    label: "Attatba",
    value: "attatba",
    wilaya: "tipaza",
  },
  {
    label: "Chaiba",
    value: "chaiba",
    wilaya: "tipaza",
  },
  {
    label: "Kolea",
    value: "kolea",
    wilaya: "tipaza",
  },
  {
    label: "Sidi Semiane",
    value: "sidi_semiane",
    wilaya: "tipaza",
  },
  {
    label: "Tipaza",
    value: "tipaza",
    wilaya: "tipaza",
  },
  {
    label: "Beni Mileuk",
    value: "beni_mileuk",
    wilaya: "tipaza",
  },
  {
    label: "El Mechira",
    value: "el_mechira",
    wilaya: "mila",
  },
  {
    label: "El Ayadi Barbes",
    value: "el_ayadi_barbes",
    wilaya: "mila",
  },
  {
    label: "Ain Beida Harriche",
    value: "ain_beida_harriche",
    wilaya: "mila",
  },
  {
    label: "Tassala Lematai",
    value: "tassala_lematai",
    wilaya: "mila",
  },
  {
    label: "Terrai Bainen",
    value: "terrai_bainen",
    wilaya: "mila",
  },
  {
    label: "Amira Arres",
    value: "amira_arres",
    wilaya: "mila",
  },
  {
    label: "Tassadane Haddada",
    value: "tassadane_haddada",
    wilaya: "mila",
  },
  {
    label: "Minar Zarza",
    value: "minar_zarza",
    wilaya: "mila",
  },
  {
    label: "Sidi Merouane",
    value: "sidi_merouane",
    wilaya: "mila",
  },
  {
    label: "Chigara",
    value: "chigara",
    wilaya: "mila",
  },
  {
    label: "Hamala",
    value: "hamala",
    wilaya: "mila",
  },
  {
    label: "Grarem Gouga",
    value: "grarem_gouga",
    wilaya: "mila",
  },
  {
    label: "Tiberguent",
    value: "tiberguent",
    wilaya: "mila",
  },
  {
    label: "Rouached",
    value: "rouached",
    wilaya: "mila",
  },
  {
    label: "Derrahi Bousselah",
    value: "derrahi_bousselah",
    wilaya: "mila",
  },
  {
    label: "Zeghaia",
    value: "zeghaia",
    wilaya: "mila",
  },
  {
    label: "Oued Endja",
    value: "oued_endja",
    wilaya: "mila",
  },
  {
    label: "Ahmed Rachedi",
    value: "ahmed_rachedi",
    wilaya: "mila",
  },
  {
    label: "Tadjenanet",
    value: "tadjenanet",
    wilaya: "mila",
  },
  {
    label: "Ain Mellouk",
    value: "ain_mellouk",
    wilaya: "mila",
  },
  {
    label: "Ouled Khalouf",
    value: "ouled_khalouf",
    wilaya: "mila",
  },
  {
    label: "Benyahia Abderrahmane",
    value: "benyahia_abderrahmane",
    wilaya: "mila",
  },
  {
    label: "Teleghma",
    value: "teleghma",
    wilaya: "mila",
  },
  {
    label: "Oued Seguen",
    value: "oued_seguen",
    wilaya: "mila",
  },
  {
    label: "Oued Athmenia",
    value: "oued_athmenia",
    wilaya: "mila",
  },
  {
    label: "Ain Tine",
    value: "ain_tine",
    wilaya: "mila",
  },
  {
    label: "Chelghoum Laid",
    value: "chelghoum_laid",
    wilaya: "mila",
  },
  {
    label: "Yahia Beniguecha",
    value: "yahia_beniguecha",
    wilaya: "mila",
  },
  {
    label: "Ferdjioua",
    value: "ferdjioua",
    wilaya: "mila",
  },
  {
    label: "Sidi Khelifa",
    value: "sidi_khelifa",
    wilaya: "mila",
  },
  {
    label: "Mila",
    value: "mila",
    wilaya: "mila",
  },
  {
    label: "Bouhatem",
    value: "bouhatem",
    wilaya: "mila",
  },
  {
    label: "Khemis-Miliana",
    value: "khemis-miliana",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Sidi-Lakhdar",
    value: "sidi-lakhdar",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Ain-Benian",
    value: "ain-benian",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Ain-Torki",
    value: "ain-torki",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Hammam-Righa",
    value: "hammam-righa",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Bourached",
    value: "bourached",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Hoceinia",
    value: "hoceinia",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Djelida",
    value: "djelida",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Arib",
    value: "arib",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Djemaa Ouled Cheikh",
    value: "djemaa_ouled_cheikh",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "El-Amra",
    value: "el-amra",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "El-Attaf",
    value: "el-attaf",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Tiberkanine",
    value: "tiberkanine",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Ain-Bouyahia",
    value: "ain-bouyahia",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "El-Abadia",
    value: "el-abadia",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Tacheta Zegagha",
    value: "tacheta_zegagha",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Birbouche",
    value: "birbouche",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Djendel",
    value: "djendel",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Ben Allal",
    value: "ben_allal",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Oued Chorfa",
    value: "oued_chorfa",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Boumedfaa",
    value: "boumedfaa",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Ain-Lechiakh",
    value: "ain-lechiakh",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Ain-Soltane",
    value: "ain-soltane",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Oued Djemaa",
    value: "oued_djemaa",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "El-Maine",
    value: "el-maine",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Rouina",
    value: "rouina",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Zeddine",
    value: "zeddine",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Bir-Ould-Khelifa",
    value: "bir-ould-khelifa",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Bordj-Emir-Khaled",
    value: "bordj-emir-khaled",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Tarik-Ibn-Ziad",
    value: "tarik-ibn-ziad",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Bathia",
    value: "bathia",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Belaas",
    value: "belaas",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Hassania",
    value: "hassania",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Ain-Defla",
    value: "ain-defla",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Miliana",
    value: "miliana",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Mekhatria",
    value: "mekhatria",
    wilaya: "a\u00efn_defla",
  },
  {
    label: "Tiout",
    value: "tiout",
    wilaya: "na\u00e2ma",
  },
  {
    label: "Moghrar",
    value: "moghrar",
    wilaya: "na\u00e2ma",
  },
  {
    label: "Asla",
    value: "asla",
    wilaya: "na\u00e2ma",
  },
  {
    label: "Kasdir",
    value: "kasdir",
    wilaya: "na\u00e2ma",
  },
  {
    label: "Makmen Ben Amar",
    value: "makmen_ben_amar",
    wilaya: "na\u00e2ma",
  },
  {
    label: "Ain Sefra",
    value: "ain_sefra",
    wilaya: "na\u00e2ma",
  },
  {
    label: "Mecheria",
    value: "mecheria",
    wilaya: "na\u00e2ma",
  },
  {
    label: "El Biodh",
    value: "el_biodh",
    wilaya: "na\u00e2ma",
  },
  {
    label: "Ain Ben Khelil",
    value: "ain_ben_khelil",
    wilaya: "na\u00e2ma",
  },
  {
    label: "Naama",
    value: "naama",
    wilaya: "na\u00e2ma",
  },
  {
    label: "Djenienne Bourezg",
    value: "djenienne_bourezg",
    wilaya: "na\u00e2ma",
  },
  {
    label: "Sfissifa",
    value: "sfissifa",
    wilaya: "na\u00e2ma",
  },
  {
    label: "Sidi Boumediene",
    value: "sidi_boumediene",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Tamzoura",
    value: "tamzoura",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Chaabat El Ham",
    value: "chaabat_el_ham",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "El Maleh",
    value: "el_maleh",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Ouled Kihal",
    value: "ouled_kihal",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Chentouf",
    value: "chentouf",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Terga",
    value: "terga",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Oued Sebbah",
    value: "oued_sebbah",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "El Amria",
    value: "el_amria",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Hassi El Ghella",
    value: "hassi_el_ghella",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Ouled Boudjemaa",
    value: "ouled_boudjemaa",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Aghlal",
    value: "aghlal",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Ain Kihal",
    value: "ain_kihal",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Ain Tolba",
    value: "ain_tolba",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Aoubellil",
    value: "aoubellil",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Beni Saf",
    value: "beni_saf",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Hassasna",
    value: "hassasna",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Emir Abdelkader",
    value: "emir_abdelkader",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Sidi Safi",
    value: "sidi_safi",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Oulhaca El Gheraba",
    value: "oulhaca_el_gheraba",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Sidi Ouriache",
    value: "sidi_ouriache",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Ain El Arbaa",
    value: "ain_el_arbaa",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "El Messaid",
    value: "el_messaid",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Oued Berkeche",
    value: "oued_berkeche",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Sidi Ben Adda",
    value: "sidi_ben_adda",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Ain Temouchent",
    value: "ain_temouchent",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Bouzedjar",
    value: "bouzedjar",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Hammam Bou Hadjar",
    value: "hammam_bou_hadjar",
    wilaya: "a\u00efn_t\u00e9mouchent",
  },
  {
    label: "Dhayet Bendhahoua",
    value: "dhayet_bendhahoua",
    wilaya: "gharda\u00efa",
  },
  {
    label: "Mansoura",
    value: "mansoura",
    wilaya: "gharda\u00efa",
  },
  {
    label: "El Atteuf",
    value: "el_atteuf",
    wilaya: "gharda\u00efa",
  },
  {
    label: "Bounoura",
    value: "bounoura",
    wilaya: "gharda\u00efa",
  },
  {
    label: "Zelfana",
    value: "zelfana",
    wilaya: "gharda\u00efa",
  },
  {
    label: "El Guerrara",
    value: "el_guerrara",
    wilaya: "gharda\u00efa",
  },
  {
    label: "Sebseb",
    value: "sebseb",
    wilaya: "gharda\u00efa",
  },
  {
    label: "Metlili",
    value: "metlili",
    wilaya: "gharda\u00efa",
  },
  {
    label: "Berriane",
    value: "berriane",
    wilaya: "gharda\u00efa",
  },
  {
    label: "Ghardaia",
    value: "ghardaia",
    wilaya: "gharda\u00efa",
  },
  {
    label: "El-Guettar",
    value: "el-guettar",
    wilaya: "relizane",
  },
  {
    label: "Ouled Aiche",
    value: "ouled_aiche",
    wilaya: "relizane",
  },
  {
    label: "Beni Dergoun",
    value: "beni_dergoun",
    wilaya: "relizane",
  },
  {
    label: "Dar Ben Abdelah",
    value: "dar_ben_abdelah",
    wilaya: "relizane",
  },
  {
    label: "Zemmoura",
    value: "zemmoura",
    wilaya: "relizane",
  },
  {
    label: "Djidiouia",
    value: "djidiouia",
    wilaya: "relizane",
  },
  {
    label: "Hamri",
    value: "hamri",
    wilaya: "relizane",
  },
  {
    label: "Belaassel Bouzagza",
    value: "belaassel_bouzagza",
    wilaya: "relizane",
  },
  {
    label: "El-Matmar",
    value: "el-matmar",
    wilaya: "relizane",
  },
  {
    label: "Sidi Khettab",
    value: "sidi_khettab",
    wilaya: "relizane",
  },
  {
    label: "Sidi M'hamed Benaouda",
    value: "sidi_m'hamed_benaouda",
    wilaya: "relizane",
  },
  {
    label: "Ain-Tarek",
    value: "ain-tarek",
    wilaya: "relizane",
  },
  {
    label: "Had Echkalla",
    value: "had_echkalla",
    wilaya: "relizane",
  },
  {
    label: "El Ouldja",
    value: "el_ouldja",
    wilaya: "relizane",
  },
  {
    label: "Mazouna",
    value: "mazouna",
    wilaya: "relizane",
  },
  {
    label: "Ain Rahma",
    value: "ain_rahma",
    wilaya: "relizane",
  },
  {
    label: "Kalaa",
    value: "kalaa",
    wilaya: "relizane",
  },
  {
    label: "Sidi Saada",
    value: "sidi_saada",
    wilaya: "relizane",
  },
  {
    label: "Yellel",
    value: "yellel",
    wilaya: "relizane",
  },
  {
    label: "Souk El Had",
    value: "souk_el_had",
    wilaya: "relizane",
  },
  {
    label: "Mendes",
    value: "mendes",
    wilaya: "relizane",
  },
  {
    label: "Oued Essalem",
    value: "oued_essalem",
    wilaya: "relizane",
  },
  {
    label: "Sidi Lazreg",
    value: "sidi_lazreg",
    wilaya: "relizane",
  },
  {
    label: "Ammi Moussa",
    value: "ammi_moussa",
    wilaya: "relizane",
  },
  {
    label: "Ouarizane",
    value: "ouarizane",
    wilaya: "relizane",
  },
  {
    label: "Merdja Sidi Abed",
    value: "merdja_sidi_abed",
    wilaya: "relizane",
  },
  {
    label: "Ouled Sidi Mihoub",
    value: "ouled_sidi_mihoub",
    wilaya: "relizane",
  },
  {
    label: "Bendaoud",
    value: "bendaoud",
    wilaya: "relizane",
  },
  {
    label: "Oued-Rhiou",
    value: "oued-rhiou",
    wilaya: "relizane",
  },
  {
    label: "El Hassi",
    value: "el_hassi",
    wilaya: "relizane",
  },
  {
    label: "Sidi M'hamed Benali",
    value: "sidi_m'hamed_benali",
    wilaya: "relizane",
  },
  {
    label: "Mediouna",
    value: "mediouna",
    wilaya: "relizane",
  },
  {
    label: "Beni Zentis",
    value: "beni_zentis",
    wilaya: "relizane",
  },
  {
    label: "Oued El Djemaa",
    value: "oued_el_djemaa",
    wilaya: "relizane",
  },
  {
    label: "Lahlef",
    value: "lahlef",
    wilaya: "relizane",
  },
  {
    label: "Relizane",
    value: "relizane",
    wilaya: "relizane",
  },
  {
    label: "El H'madna",
    value: "el_h'madna",
    wilaya: "relizane",
  },
  {
    label: "Ramka",
    value: "ramka",
    wilaya: "relizane",
  },
  {
    label: "Tinerkouk",
    value: "tinerkouk",
    wilaya: "timimoun",
  },
  {
    label: "Timimoun",
    value: "timimoun",
    wilaya: "timimoun",
  },
  {
    label: "Ouled Said",
    value: "ouled_said",
    wilaya: "timimoun",
  },
  {
    label: "Metarfa",
    value: "metarfa",
    wilaya: "timimoun",
  },
  {
    label: "Talmine",
    value: "talmine",
    wilaya: "timimoun",
  },
  {
    label: "Ouled Aissa",
    value: "ouled_aissa",
    wilaya: "timimoun",
  },
  {
    label: "Charouine",
    value: "charouine",
    wilaya: "timimoun",
  },
  {
    label: "Aougrout",
    value: "aougrout",
    wilaya: "timimoun",
  },
  {
    label: "Deldoul",
    value: "deldoul",
    wilaya: "timimoun",
  },
  {
    label: "Ksar Kaddour",
    value: "ksar_kaddour",
    wilaya: "timimoun",
  },
  {
    label: "Timiaouine",
    value: "timiaouine",
    wilaya: "bordj_badji_mokhtar",
  },
  {
    label: "Bordj Badji Mokhtar",
    value: "bordj_badji_mokhtar",
    wilaya: "bordj_badji_mokhtar",
  },
  {
    label: "Ras El Miad",
    value: "ras_el_miad",
    wilaya: "ouled_djellal",
  },
  {
    label: "Besbes",
    value: "besbes",
    wilaya: "ouled_djellal",
  },
  {
    label: "Sidi Khaled",
    value: "sidi_khaled",
    wilaya: "ouled_djellal",
  },
  {
    label: "Doucen",
    value: "doucen",
    wilaya: "ouled_djellal",
  },
  {
    label: "Chaiba",
    value: "chaiba",
    wilaya: "ouled_djellal",
  },
  {
    label: "Ouled Djellal",
    value: "ouled_djellal",
    wilaya: "ouled_djellal",
  },
  {
    label: "Beni-Abbes",
    value: "beni-abbes",
    wilaya: "b\u00e9ni_abb\u00e8s",
  },
  {
    label: "Tamtert",
    value: "tamtert",
    wilaya: "b\u00e9ni_abb\u00e8s",
  },
  {
    label: "Igli",
    value: "igli",
    wilaya: "b\u00e9ni_abb\u00e8s",
  },
  {
    label: "El Ouata",
    value: "el_ouata",
    wilaya: "b\u00e9ni_abb\u00e8s",
  },
  {
    label: "Ouled-Khodeir",
    value: "ouled-khodeir",
    wilaya: "b\u00e9ni_abb\u00e8s",
  },
  {
    label: "Kerzaz",
    value: "kerzaz",
    wilaya: "b\u00e9ni_abb\u00e8s",
  },
  {
    label: "Timoudi",
    value: "timoudi",
    wilaya: "b\u00e9ni_abb\u00e8s",
  },
  {
    label: "Ksabi",
    value: "ksabi",
    wilaya: "b\u00e9ni_abb\u00e8s",
  },
  {
    label: "Beni-Ikhlef",
    value: "beni-ikhlef",
    wilaya: "b\u00e9ni_abb\u00e8s",
  },
  {
    label: "Inghar",
    value: "inghar",
    wilaya: "in_salah",
  },
  {
    label: "Ain Salah",
    value: "ain_salah",
    wilaya: "in_salah",
  },
  {
    label: "Foggaret Ezzoua",
    value: "foggaret_ezzoua",
    wilaya: "in_salah",
  },
  {
    label: "Tin Zouatine",
    value: "tin_zouatine",
    wilaya: "in_guezzam",
  },
  {
    label: "Ain Guezzam",
    value: "ain_guezzam",
    wilaya: "in_guezzam",
  },
  {
    label: "Temacine",
    value: "temacine",
    wilaya: "touggourt",
  },
  {
    label: "Sidi Slimane",
    value: "sidi_slimane",
    wilaya: "touggourt",
  },
  {
    label: "Megarine",
    value: "megarine",
    wilaya: "touggourt",
  },
  {
    label: "Nezla",
    value: "nezla",
    wilaya: "touggourt",
  },
  {
    label: "Blidet Amor",
    value: "blidet_amor",
    wilaya: "touggourt",
  },
  {
    label: "Tebesbest",
    value: "tebesbest",
    wilaya: "touggourt",
  },
  {
    label: "Touggourt",
    value: "touggourt",
    wilaya: "touggourt",
  },
  {
    label: "Taibet",
    value: "taibet",
    wilaya: "touggourt",
  },
  {
    label: "El Alia",
    value: "el_alia",
    wilaya: "touggourt",
  },
  {
    label: "El-Hadjira",
    value: "el-hadjira",
    wilaya: "touggourt",
  },
  {
    label: "Benaceur",
    value: "benaceur",
    wilaya: "touggourt",
  },
  {
    label: "M'naguer",
    value: "m'naguer",
    wilaya: "touggourt",
  },
  {
    label: "Zaouia El Abidia",
    value: "zaouia_el_abidia",
    wilaya: "touggourt",
  },
  {
    label: "Djanet",
    value: "djanet",
    wilaya: "djanet",
  },
  {
    label: "Bordj El Haouass",
    value: "bordj_el_haouass",
    wilaya: "djanet",
  },
  {
    label: "Oum Touyour",
    value: "oum_touyour",
    wilaya: "el_meghaier",
  },
  {
    label: "Sidi Amrane",
    value: "sidi_amrane",
    wilaya: "el_meghaier",
  },
  {
    label: "M'rara",
    value: "m'rara",
    wilaya: "el_meghaier",
  },
  {
    label: "Djamaa",
    value: "djamaa",
    wilaya: "el_meghaier",
  },
  {
    label: "Tenedla",
    value: "tenedla",
    wilaya: "el_meghaier",
  },
  {
    label: "El-M'ghaier",
    value: "el-m'ghaier",
    wilaya: "el_meghaier",
  },
  {
    label: "Still",
    value: "still",
    wilaya: "el_meghaier",
  },
  {
    label: "Sidi Khelil",
    value: "sidi_khelil",
    wilaya: "el_meghaier",
  },
  {
    label: "El Meniaa",
    value: "el_meniaa",
    wilaya: "el_menia",
  },
  {
    label: "Hassi Gara",
    value: "hassi_gara",
    wilaya: "el_menia",
  },
  {
    label: "Hassi Fehal",
    value: "hassi_fehal",
    wilaya: "el_menia",
  },
];

// Update your form schema to include the wilaya selection
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),

  termsOfService: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms of service."),
  wilaya: z.string({ required_error: "Please select a wilaya." }), // Ensure this line is correctly added
  city: z.string({ required_error: "Please select a city." }), // Ensure this line is correctly added
  role: z.enum(["client", "expert"], {
    required_error: "You must select a role.",
  }),
});

export default function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      wilaya: "", // Default wilaya selection
      city: "", // Default wilaya selection
    },
  });

  const [filteredCities, setFilteredCities] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const selectedWilaya = form.watch("wilaya");
    const citiesForWilaya = cities.filter(
      (city) => city.wilaya === selectedWilaya
    );
    setFilteredCities(citiesForWilaya);
    // Reset city field if wilaya changes
    form.setValue("city", "");
  }, [form.watch("wilaya")]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (values) => {
    console.log(values);
    // Handle form submission, e.g., API call
  };

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold mb-6">Sign Up</h2>
      <Button variant="outline" className="w-full mb-4">
        Continue with Google
      </Button>
      <Divider className="opacity-60">OR</Divider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      {...field}
                      className="w-full pr-10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-2">
                      {showPassword ? (
                        <Eye
                          className="m-2 h-4 w-4 shrink-0 opacity-50"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <EyeOff
                          className="m-2 h-4 w-4 shrink-0 opacity-50"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wilaya"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Wilaya</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {field.value
                          ? wilayas.find(
                              (wilaya) => wilaya.value === field.value
                            )?.label
                          : "Select wilaya"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col w-full p-0">
                    <Command>
                      <CommandEmpty>No wilaya found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="h-72 w-48 rounded-md">
                          {wilayas.map((wilaya) => (
                            <CommandItem
                              key={wilaya.value}
                              value={wilaya.label}
                              onSelect={() => {
                                form.setValue("wilaya", wilaya.value);
                              }}
                            >
                              <Check
                                className={` mr-2 h-4 w-4 ${
                                  wilaya.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {wilaya.label}
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                      <CommandInput placeholder="Search wilaya..." />
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Cities</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {field.value
                          ? filteredCities.find(
                              (city) => city.value === field.value
                            )?.label
                          : "Select a city"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col w-full p-0">
                    <Command>
                      {form.getValues("wilaya") ? ( // Check if a wilaya has been selected
                        <>
                          <CommandEmpty>No city found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-max-72 w-48 rounded-md">
                              {filteredCities.map((city) => (
                                <CommandItem
                                  key={city.value}
                                  value={city.label}
                                  onSelect={() =>
                                    form.setValue("city", city.value)
                                  }
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${
                                      city.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                                  />
                                  {city.label}
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                          <CommandInput placeholder="Search city..." />
                        </>
                      ) : (
                        <div className="py-6 text-center text-sm w-48">
                          Please select a wilaya first!
                        </div>
                      )}
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center mt-4">
                <FormLabel>I am:</FormLabel>
                <div className="mt-2">
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex"
                  >
                    <div className="flex">
                      <div
                        className={cn(
                          "cursor-pointer space-x-2 flex items-center justify-center px-4 py-2 border text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2",
                          field.value === "client"
                            ? "bg-gray-200 border-black rounded-l-full"
                            : "bg-white border-black rounded-l-full"
                        )}
                      >
                        <RadioGroupItem value="client" id="client" />
                        <Label htmlFor="client">A Client</Label>
                      </div>
                      <div
                        className={cn(
                          "cursor-pointer flex items-center space-x-2 justify-center px-4 py-2 border-t border-b border-r text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2",
                          field.value === "expert"
                            ? "bg-gray-200 border-black rounded-r-full"
                            : "bg-white border-black rounded-r-full"
                        )}
                      >
                        {" "}
                        <RadioGroupItem value="expert" id="expert" />
                        <Label htmlFor="expert">An Expert</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="termsOfService"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex justify-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        {...field}
                      />
                      <Label htmlFor="terms">
                        Yes, I understand and agree to the Terms of Service
                      </Label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-4">
            Sign Up
          </Button>
          <div className="text-center mt-4">
            Already have an ccount?
            <Link
              to="/login"
              className="text-primary underline-offset-4 hover:underline ml-1"
            >
              {" "}
              Log in{" "}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
