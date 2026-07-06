/* ============================================================
   Ô Cap — carte + panier + commande WhatsApp
   ============================================================ */
(function () {
  "use strict";

  /* Numéro WhatsApp du restaurant (Côte d'Ivoire +225) */
  var WHATSAPP = "2250701313131";

  /* ---------- Données de la carte ---------- */
  // b:true => "by Le Pêcheur"
  var MENU = [
    { id: "petitdej", label: "Petit-déj", note: "Servi de 8h à 11h30",
      groups: [
        { t: "Nos formules", items: [
          { n: "L'Express", d: "Une viennoiserie + une boisson chaude", p: 3000 },
          { n: "Le Parisien", d: "Croissant ou pain au chocolat, corbeille de pain beurre-confiture, café ou thé, jus frais", p: 5000 },
          { n: "Le Brunch", d: "Formule Parisien + une omelette nature ou composée", p: 6500 },
          { n: "La Complète", d: "2 pancakes & sirop d'érable, corbeille de pain, omelette, café ou thé, jus frais", p: 9000 },
        ]},
        { t: "Nos œufs", items: [
          { n: "Œufs au plat", d: "", p: 3000 },
          { n: "Omelette nature", d: "", p: 3000 },
          { n: "Omelette jambon de dinde fumée & fromage", d: "", p: 3500 },
          { n: "Omelette aux champignons de Paris", d: "", p: 3500 },
          { n: "Œufs brouillés", d: "", p: 3500 },
        ]},
        { t: "Nos assiettes", items: [
          { n: "Tartine d'avocat", d: "Œufs pochés, légumes sautés et salade", p: 3500 },
          { n: "Tartine de saumon fumé", d: "Fromage frais, fruits rouges", p: 3500 },
          { n: "Salade de fruits frais", d: "", p: 3500 },
        ]},
      ]},

    { id: "formules", label: "Formules & enfant",
      groups: [
        { t: "", items: [
          { n: "Formule Cinéma", d: "Sélection maison + une place de cinéma Pathé incluse ! (Hot dog-soda-frites, ou garba-attiéké-condiments-soft, ou croque monsieur-soda-frites)", p: 10000 },
          { n: "Menu Enfant", d: "Fish'n'chips, ou steak haché-frites, ou escalope de poulet panée-frites + 1 boule de glace ou 1 part de cake — tour de manège offert", p: 8500 },
        ]},
      ]},

    { id: "entrees", label: "Entrées",
      groups: [{ t: "", items: [
        { n: "Assiette de la Mer", d: "À partager, pour 2 personnes", p: 12000, b: true },
        { n: "Tempura de Gambas", d: "", p: 11000 },
        { n: "Dynamite Shrimp", d: "Crevettes épicées, sauce crémeuse", p: 9500, b: true },
        { n: "Bâtonnet de Mérou au Parmesan", d: "", p: 8000 },
        { n: "Buffalo Wings", d: "", p: 7000 },
        { n: "Chicken Strip", d: "Lamelles de poulet panées et frites", p: 6000 },
        { n: "Mozza Stick", d: "Bâtonnets de mozzarella panés et frits", p: 6000 },
      ]}]},

    { id: "salades", label: "Salades",
      groups: [{ t: "", items: [
        { n: "Salade Ô'Cap", d: "Thon confit, supion, olives noires, mesclun, tomates cerises", p: 12500, b: true },
        { n: "Salade Caesar", d: "Poulet frit, sucrine, croûtons, parmigiano", p: 12000 },
        { n: "Salade Niçoise", d: "Thon, œuf, sucrine, pomme de terre, haricot vert, olives noires", p: 10500 },
      ]}]},

    { id: "cru", label: "Le Cru",
      groups: [{ t: "", items: [
        { n: "Ceviche", d: "Poisson cru mariné aux agrumes et épices", p: 12000, b: true },
        { n: "Tataki de Thon", d: "Poêlée de légumes", p: 10000 },
        { n: "Carpaccio Mixte", d: "Assortiment de poissons crus à l'huile d'olive", p: 9000 },
        { n: "Carpaccio de Mérou", d: "Fines tranches de mérou cru à l'huile d'olive", p: 8000 },
        { n: "Carpaccio de Thon", d: "Fines tranches de thon cru à l'huile d'olive", p: 6500 },
      ]}]},

    { id: "pates", label: "Les Pâtes", note: "Spaghetti ou penne au choix",
      groups: [{ t: "", items: [
        { n: "Napolitaine ou Arrabiata", d: "Sauce tomate maison au basilic (arrabiata pimentée)", p: 7500 },
        { n: "Bolognaise", d: "Viande hachée, sauce tomate maison, parmigiano", p: 8500 },
        { n: "Pesto Poulet", d: "Blanc de poulet, basilic frais, huile d'olive, ail", p: 11000 },
        { n: "Alfredo", d: "Blanc de poulet, crème fraîche, champignon, basilic, parmigiano", p: 11000 },
        { n: "Fruits de Mer", d: "Mérou, crevettes, supion, sauce tomate à la bisque", p: 13000 },
      ]}]},

    { id: "plats", label: "Les Classiques", note: "Accompagnements : frites, riz blanc ou légumes",
      groups: [{ t: "", items: [
        { n: "Poulet Crème Champignon", d: "", p: 12000 },
        { n: "Steak de Bœuf", d: "Sauce poivre ou champignon", p: 12500 },
        { n: "Entrecôte de Bœuf Black Angus", d: "Sauce poivre ou champignon", p: 19500 },
        { n: "Pavé de Saumon", d: "Purée de pomme de terre, sauce gingembre & citron", p: 14000 },
        { n: "Filet de Mérou grillé", d: "Sauce à la crème ou citron & basilic", p: 12500 },
      ]}]},

    { id: "sandwichs", label: "Sandwichs", note: "Tous servis avec des frites",
      groups: [{ t: "", items: [
        { n: "Lobster Sandwich", d: "Gambas, pain brioché, sauce du pêcheur, chips maison", p: 10000, b: true },
        { n: "Philly Steak", d: "Bœuf mariné, légumes sautés, mozzarella, sauce barbecue", p: 10000 },
        { n: "Chicken Quesadillas", d: "Poulet mariné, légumes, fromage frais, guacamole, pico de gallo", p: 9500 },
        { n: "Club Poulet", d: "Poulet, sucrine, tomates, mayonnaise, câpres, cornichon", p: 8500 },
        { n: "Croque Monsieur", d: "Jambon de dinde fumée, emmental, béchamel", p: 8000 },
        { n: "Hot Dog", d: "Saucisse de bœuf, cheddar, moutarde, ketchup, chips maison", p: 6500 },
      ]}]},

    { id: "burgers", label: "Burgers de papa", note: "Tous servis avec des frites",
      groups: [{ t: "", items: [
        { n: "Fish Burger", d: "Crispy de mérou, roquette, tomates, cornichon, mayonnaise au curry", p: 12000, b: true },
        { n: "Ô'Cap Burger", d: "Steak haché, salade, tomates, oignons, jalapeños, cheddar, sauce aux herbes", p: 9500 },
        { n: "Crispy Chicken", d: "Crispy de poulet, légumes sautés, cheddar, sauce Ô'Cap", p: 8500 },
        { n: "Lebanese Burger", d: "Steak haché 150g, tomates, cornichon, frites, coleslaw, cheddar", p: 8000 },
        { n: "Cheese Burger (simple)", d: "Steak haché 150g, oignon caramélisé, salade, cheddar, cornichon", p: 7500 },
        { n: "Cheese Burger double", d: "", p: 10000 },
        { n: "Cheese Burger triple", d: "", p: 12500 },
      ]}]},

    { id: "desserts", label: "Desserts & Glaces",
      groups: [
        { t: "Nos douceurs maison", items: [
          { n: "Brownie", d: "", p: 5000 },
          { n: "Fondant au Chocolat", d: "", p: 5000 },
          { n: "Pain Perdu", d: "", p: 5000 },
          { n: "Tarte Tatin", d: "", p: 4500 },
          { n: "Tiramisu au Chocolat", d: "", p: 4000 },
          { n: "Tiramisu au Café", d: "", p: 4000 },
          { n: "Salade de Fruits Frais", d: "", p: 3500 },
          { n: "Cake au Citron", d: "", p: 1500 },
          { n: "Cake à l'Orange", d: "", p: 1500 },
          { n: "Cake aux Fruits Confits", d: "", p: 1500 },
          { n: "Marbré au Chocolat", d: "", p: 1500 },
        ]},
        { t: "Crêpes · Pancakes · Gaufres", items: [
          { n: "Sucre", d: "", p: 3000 },
          { n: "Sucre glace", d: "", p: 3000 },
          { n: "Sucre citron", d: "", p: 3500 },
          { n: "Beurre sucré", d: "", p: 3500 },
          { n: "Nutella", d: "", p: 3500 },
          { n: "Caramel", d: "", p: 3500 },
          { n: "Confiture", d: "", p: 3500 },
          { n: "Fruits frais", d: "", p: 5000 },
          { n: "Supplément chantilly", d: "", p: 1000 },
        ]},
        { t: "Nos glaces — la boule", items: [
          { n: "Glace Vanille", d: "", p: 2000 },
          { n: "Glace Café", d: "", p: 2000 },
          { n: "Glace Chocolat", d: "", p: 2000 },
          { n: "Glace Arachide", d: "", p: 2000 },
          { n: "Glace Noisette", d: "", p: 2000 },
          { n: "Glace Caramel beurre salé", d: "", p: 2000 },
          { n: "Sorbet Fraise", d: "", p: 2000 },
          { n: "Sorbet Mangue", d: "", p: 2000 },
          { n: "Sorbet Ananas", d: "", p: 2000 },
          { n: "Sorbet Citron", d: "", p: 2000 },
          { n: "Sorbet Passion", d: "", p: 2000 },
        ]},
        { t: "Nos coupes glacées", items: [
          { n: "Banana Split", d: "Sorbet fraise, glace vanille & chocolat, banane, coulis choco, chantilly", p: 6000 },
          { n: "L'Éxotique", d: "Sorbet mangue & ananas, glace coco, purée de passion, chantilly", p: 6000 },
          { n: "Dame Blanche", d: "2 boules vanille, glace chocolat, coulis & pépites de chocolat, chantilly", p: 6000 },
          { n: "Colonel", d: "2 boules citron, vodka", p: 7000 },
          { n: "La Bailey's", d: "Glace café & vanille, liqueur Baileys", p: 7000 },
          { n: "La Jamaican", d: "Sorbet mangue & ananas, rhum blanc", p: 7000 },
        ]},
      ]},

    { id: "boissons", label: "Boissons",
      groups: [
        { t: "Boissons chaudes", items: [
          { n: "Ristretto / Espresso / Allongé — Blend AFR", d: "", p: 2000 },
          { n: "Double Espresso", d: "", p: 4000 },
          { n: "Café au lait", d: "", p: 2500 },
          { n: "Espresso Macchiato", d: "", p: 2500 },
          { n: "Espresso Coco", d: "", p: 4000 },
          { n: "Café Latte", d: "", p: 3000 },
          { n: "Cappuccino", d: "", p: 3000 },
          { n: "Café Mocha", d: "", p: 4000 },
          { n: "Caramel Mocha", d: "", p: 4000 },
          { n: "Chocolat Chaud", d: "", p: 3000 },
          { n: "Chocolat Viennois", d: "", p: 3500 },
          { n: "Cappuccino Viennois", d: "", p: 3500 },
          { n: "Thé / infusion — sélection Dammann", d: "", p: 2500 },
          { n: "Infusion Detox maison", d: "Gingembre, menthe, citron, miel", p: 3500 },
        ]},
        { t: "Boissons fraîches", items: [
          { n: "Thé glacé", d: "", p: 3000 },
          { n: "Soda 33cl", d: "Coca, Coca Zéro, Ice Tea, Fanta, Sprite, Tonic, Orangina", p: 2000 },
          { n: "Red Bull", d: "", p: 3000 },
          { n: "Jus de fruit frais maison", d: "Ananas, bissap, gingembre, pomme, passion, orange", p: 2500 },
          { n: "Eau minérale 0,5L", d: "", p: 1000 },
          { n: "Eau minérale 1,5L", d: "", p: 2000 },
          { n: "Eau gazeuse", d: "", p: 2000 },
        ]},
        { t: "Mocktails", items: [
          { n: "Virgin Mojito", d: "Sirop de canne, menthe, citron, eau gazeuse", p: 5000 },
          { n: "Bora Bora", d: "Jus d'orange, passion, ananas, citron, grenadine", p: 5000 },
          { n: "Limonade Maison", d: "Menthe, citron, sucre, eau pétillante", p: 5000 },
        ]},
        { t: "Frappés & smoothies", items: [
          { n: "Frapuccino", d: "", p: 4000 },
          { n: "Frapucoco", d: "", p: 5000 },
          { n: "Smoothie", d: "Fraise, banane, mangue, passion ou pomme verte", p: 5000 },
          { n: "Milkshake", d: "Vanille, chocolat ou fraise", p: 5000 },
        ]},
      ]},

    { id: "alcools", label: "Vins & Alcools", note: "L'abus d'alcool est dangereux pour la santé.",
      groups: [
        { t: "Cocktails", items: [
          { n: "Jamaica", d: "Tequila, vodka, triple sec, passion, ananas, grenadine, menthe", p: 7000 },
          { n: "Margarita", d: "Tequila, triple sec, jus de citron", p: 6000 },
          { n: "Mojito", d: "Rhum blanc, sirop de canne, menthe, citron, eau gazeuse", p: 6000 },
          { n: "Punch Maison", d: "Rhum blanc, triple sec, orange, citron, grenadine", p: 6000 },
          { n: "Gin Tonic", d: "Gin Gordon, Schweppes tonic", p: 6000 },
          { n: "Irish Coffee", d: "Whisky, café, crème fouettée", p: 7000 },
          { n: "Long Island", d: "Rhum blanc & ambré, vodka, gin, tequila, triple sec, coca, citron", p: 7000 },
        ]},
        { t: "Vins & mousseux", items: [
          { n: "Prosecco Vilaveroni", d: "", p: 19000 },
          { n: "IGP Méditerranée Chemin de Sable · Rosé", d: "", p: 18000 },
          { n: "AOP Côtes du Rhône G. Meffre Laurus · Rouge", d: "", p: 21500 },
          { n: "AOP Bordeaux Calvet BIO · Rouge", d: "", p: 19500 },
          { n: "AOP Côtes du Roussillon Bila-Haut 2021 · Rouge", d: "Maison Chapoutier", p: 19500 },
          { n: "AOP Graves rouge Ch. Ferrande 2020 · Rouge", d: "", p: 35000 },
          { n: "AOP Muscadet Plaisir de Vignes · Blanc", d: "Vallée de la Loire", p: 18000 },
          { n: "AOP Côtes de Bergerac moelleux · Blanc", d: "", p: 19500 },
          { n: "AOP Pouilly Fumé Les Mariniers 2021 · Blanc", d: "Dom. J. Mellot", p: 47000 },
        ]},
        { t: "Digestifs & spiritueux", items: [
          { n: "Gin Gordon", d: "", p: 3000 },
          { n: "Rhum blanc Saint James", d: "", p: 3000 },
          { n: "Rhum ambré Saint James", d: "", p: 3000 },
          { n: "Vodka Absolut", d: "", p: 3000 },
          { n: "Tequila Castillo blanche", d: "", p: 3000 },
          { n: "Red Label Whisky", d: "", p: 3000 },
          { n: "Jack Daniel's Whisky", d: "", p: 4000 },
          { n: "Limoncello", d: "", p: 3000 },
          { n: "Martini rosato", d: "", p: 3500 },
          { n: "Martini bianco", d: "", p: 3500 },
          { n: "Ricard", d: "", p: 4000 },
          { n: "Bailey's", d: "", p: 4000 },
        ]},
        { t: "Bières", items: [
          { n: "Beaufort", d: "", p: 3000 },
          { n: "Heineken", d: "", p: 3000 },
          { n: "Desperados", d: "", p: 4000 },
        ]},
      ]},
  ];

  /* ---------- Index des articles (id -> {name, price}) ---------- */
  var ITEMS = {};
  MENU.forEach(function (cat) {
    cat.groups.forEach(function (g, gi) {
      g.items.forEach(function (it, ii) {
        it._id = cat.id + "-" + gi + "-" + ii;
        ITEMS[it._id] = { name: it.n, price: it.p };
      });
    });
  });

  /* ---------- Panier (persisté) ---------- */
  var cart = {};
  try { cart = JSON.parse(localStorage.getItem("ocap_cart") || "{}"); } catch (e) { cart = {}; }
  function saveCart() { try { localStorage.setItem("ocap_cart", JSON.stringify(cart)); } catch (e) {} }

  var fmt = function (n) { return n.toLocaleString("fr-FR"); };

  /* ---------- Rendu de la carte ---------- */
  var tabsEl = document.getElementById("menuTabs");
  var panelsEl = document.getElementById("menuPanels");

  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  MENU.forEach(function (cat, ci) {
    var tab = document.createElement("button");
    tab.className = "menu__tab" + (ci === 0 ? " is-active" : "");
    tab.setAttribute("data-cat", cat.id);
    tab.textContent = cat.label;
    tabsEl.appendChild(tab);

    var panel = document.createElement("div");
    panel.className = "menu__panel" + (ci === 0 ? " is-active" : "");
    panel.setAttribute("data-cat", cat.id);
    var html = cat.note ? '<p class="menu__catnote">' + esc(cat.note) + "</p>" : "";
    cat.groups.forEach(function (g) {
      if (g.t) html += '<h4 class="dish__sec">' + esc(g.t) + "</h4>";
      html += '<ul class="dish">';
      g.items.forEach(function (it) {
        html +=
          '<li class="dish__item">' +
            '<div class="dish__l"><h3>' + esc(it.n) + (it.b ? ' <em>by Le Pêcheur</em>' : "") + "</h3>" +
              (it.d ? "<p>" + esc(it.d) + "</p>" : "") +
            "</div>" +
            '<div class="dish__r">' +
              '<span class="dish__p">' + fmt(it.p) + "</span>" +
              '<div class="dish__add" data-id="' + it._id + '"></div>' +
            "</div>" +
          "</li>";
      });
      html += "</ul>";
    });
    panel.innerHTML = html;
    panelsEl.appendChild(panel);
  });

  /* ---------- Onglets ---------- */
  var tabs = tabsEl.querySelectorAll(".menu__tab");
  var panels = panelsEl.querySelectorAll(".menu__panel");
  tabsEl.addEventListener("click", function (e) {
    var t = e.target.closest(".menu__tab"); if (!t) return;
    var cat = t.getAttribute("data-cat");
    tabs.forEach(function (x) { x.classList.toggle("is-active", x === t); });
    panels.forEach(function (p) { p.classList.toggle("is-active", p.getAttribute("data-cat") === cat); });
    t.scrollIntoView({ block: "nearest", inline: "center" });
  });

  /* ---------- Contrôles Ajouter / stepper ---------- */
  function controlHtml(id) {
    var q = cart[id] || 0;
    if (q > 0) {
      return '<div class="stepper">' +
        '<button class="stepper__b" data-act="dec" data-id="' + id + '" aria-label="Retirer">−</button>' +
        '<span class="stepper__q">' + q + "</span>" +
        '<button class="stepper__b" data-act="inc" data-id="' + id + '" aria-label="Ajouter">+</button>' +
        "</div>";
    }
    return '<button class="addbtn" data-act="inc" data-id="' + id + '">+ Ajouter</button>';
  }
  function paintControls() {
    document.querySelectorAll(".dish__add").forEach(function (el) {
      el.innerHTML = controlHtml(el.getAttribute("data-id"));
    });
  }

  panelsEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]"); if (!b) return;
    var id = b.getAttribute("data-id");
    var act = b.getAttribute("data-act");
    cart[id] = (cart[id] || 0) + (act === "inc" ? 1 : -1);
    if (cart[id] <= 0) delete cart[id];
    saveCart(); paintControls(); refreshCart();
    if (act === "inc") pulseFab();
  });

  /* ---------- Panier / FAB / tiroir ---------- */
  var fab = document.getElementById("cartFab");
  var countEl = document.getElementById("cartCount");
  var listEl = document.getElementById("cartList");
  var emptyEl = document.getElementById("cartEmpty");
  var checkoutEl = document.getElementById("checkout");
  var totalEl = document.getElementById("cartTotal");
  var drawer = document.getElementById("drawer");

  function cartCount() { var n = 0; for (var k in cart) n += cart[k]; return n; }
  function cartTotal() { var t = 0; for (var k in cart) t += cart[k] * ITEMS[k].price; return t; }

  function refreshCart() {
    var n = cartCount();
    countEl.textContent = n;
    fab.hidden = n === 0;
    // liste
    var html = "";
    for (var k in cart) {
      var it = ITEMS[k], q = cart[k];
      html +=
        '<li class="cart__item">' +
          '<div class="cart__info"><span class="cart__name">' + esc(it.name) + "</span>" +
            '<span class="cart__unit">' + fmt(it.price) + " F</span></div>" +
          '<div class="stepper stepper--sm">' +
            '<button class="stepper__b" data-cact="dec" data-id="' + k + '">−</button>' +
            '<span class="stepper__q">' + q + "</span>" +
            '<button class="stepper__b" data-cact="inc" data-id="' + k + '">+</button>' +
          "</div>" +
          '<span class="cart__line">' + fmt(it.price * q) + " F</span>" +
        "</li>";
    }
    listEl.innerHTML = html;
    var empty = n === 0;
    emptyEl.style.display = empty ? "" : "none";
    checkoutEl.style.display = empty ? "none" : "";
    totalEl.textContent = fmt(cartTotal()) + " F";
  }

  // steppers dans le tiroir
  listEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-cact]"); if (!b) return;
    var id = b.getAttribute("data-id");
    cart[id] = (cart[id] || 0) + (b.getAttribute("data-cact") === "inc" ? 1 : -1);
    if (cart[id] <= 0) delete cart[id];
    saveCart(); paintControls(); refreshCart();
  });

  function openDrawer() { drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function closeDrawer() { drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  fab.addEventListener("click", openDrawer);
  drawer.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) closeDrawer(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });

  function pulseFab() { fab.classList.remove("pulse"); void fab.offsetWidth; fab.classList.add("pulse"); }

  /* ---------- Mode : adresse + info paiement ---------- */
  var modeSel = document.getElementById("fMode");
  var addrField = document.getElementById("addrField");
  var payEl = document.querySelector(".checkout__pay");
  function syncMode() {
    var liv = modeSel.value === "Livraison";
    addrField.style.display = liv ? "" : "none";
    payEl.innerHTML = liv
      ? "Livraison réglée par <strong>Wave</strong> ou <strong>Orange&nbsp;Money</strong> : après l'envoi, l'équipe vous confirme la commande et vous communique le numéro pour payer. Paiement en espèces possible, à convenir avec l'équipe sur WhatsApp."
      : "Réglez directement sur place. L'équipe confirme votre commande sur WhatsApp.";
  }
  modeSel.addEventListener("change", syncMode); syncMode();

  /* ---------- Envoi WhatsApp ---------- */
  document.getElementById("sendWa").addEventListener("click", function () {
    if (cartCount() === 0) return;
    var name = document.getElementById("fName").value.trim();
    var phone = document.getElementById("fPhone").value.trim();
    var mode = modeSel.value;
    var addr = document.getElementById("fAddr").value.trim();
    var note = document.getElementById("fNote").value.trim();

    var missing = [];
    if (!name) missing.push("fName");
    if (!phone) missing.push("fPhone");
    if (mode === "Livraison" && !addr) missing.push("fAddr");
    if (missing.length) {
      missing.forEach(function (idf) {
        var el = document.getElementById(idf);
        el.classList.add("field--err");
        el.addEventListener("input", function () { el.classList.remove("field--err"); }, { once: true });
      });
      document.getElementById(missing[0]).focus();
      return;
    }

    var lines = ["Bonjour Ô Cap 👋 Je souhaite passer commande :", ""];
    for (var k in cart) {
      lines.push("• " + cart[k] + "× " + ITEMS[k].name + " — " + fmt(ITEMS[k].price * cart[k]) + " F");
    }
    lines.push("");
    lines.push("Total : " + fmt(cartTotal()) + " F");
    lines.push("");
    lines.push("Mode : " + mode);
    if (mode === "Livraison") {
      lines.push("Adresse : " + addr);
      lines.push("Paiement : Wave ou Orange Money (espèces à convenir)");
    }
    lines.push("Nom : " + name);
    lines.push("Tél : " + phone);
    if (note) lines.push("Note : " + note);

    var url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank");
  });

  /* ---------- Init ---------- */
  paintControls();
  refreshCart();
})();
