var contacts = document.getElementById("contacts");
var select = document.getElementById("infoSelect");

buildContacts(contacts);

function buildContacts(contacts) {
    // contactData can be found in js/contact-data.js
    contactData.forEach(function (contact, index) {
        fillContact(contacts, contact, index);
    });
}

function fillContact(contacts, contact, rowIndex) {
    var nameElement = getNameElement(contact, rowIndex);
    var infoElement = getInfoElement(contact);
    var underlyingElement = getUnderlyingElement(contact);
    var contactElement = getContactElement(nameElement, underlyingElement, infoElement, rowIndex);

    contacts.appendChild(contactElement);
}

function getContactElement(nameElement, underlyingElement, infoElement, rowIndex) {
    var contactElement = document.createElement("tr");

    contactElement.appendChild(nameElement);
    contactElement.appendChild(underlyingElement);
    contactElement.appendChild(infoElement);

    return contactElement;
}

function getNameElement(contact, rowIndex) {
    var nameCell = document.createElement("td");
    nameCell.setAttribute("class", "contact-name");
    nameCell.setAttribute("id", rowIndex);
    nameCell.setAttribute("onmouseover", "mouseOverName(" + rowIndex + ")");
    nameCell.setAttribute("onmouseout", "mouseOutName()");

    var nameElement = document.createElement("span");
    var statusCircle = getStatusCircle(contact.status);

    nameElement.appendChild(document.createTextNode(contact.name));
    statusCircle.appendChild(nameElement);
    nameCell.appendChild(statusCircle);

    return nameCell;
}

function getInfoElement(contact) {
    var infoElement = (select.value == 1)
        ? buildInfoCell(contact.phone)
        : buildInfoCell(contact.email);

    return infoElement;
}

function getUnderlyingElement(contact) {
    var underlyingData = document.createElement("td");
    underlyingData.setAttribute("class", "underlying");

    var emailLink = document.createElement("a");
    emailLink.setAttribute("class", "email");
    emailLink.setAttribute("href", contact.email)
    emailLink.appendChild(document.createTextNode(contact.email));

    var phone = document.createElement("p");
    phone.appendChild(document.createTextNode(contact.phone.replace(/-/g, '.')));

    var address = document.createElement("p");
    address.appendChild(document.createTextNode(contact.address.street));

    var lineBreak = document.createElement("br");
    var textInfo = contact.address.city + " " + contact.address.state + ", " + contact.address.zip;

    address.appendChild(lineBreak);
    address.appendChild(document.createTextNode(textInfo));

    underlyingData.appendChild(emailLink);
    underlyingData.appendChild(phone);
    underlyingData.appendChild(address);

    return underlyingData;
}

function buildInfoCell(text) {
    var cellElement = document.createElement("td");
    cellElement.textContent = text;
    cellElement.setAttribute("class", "contact-info")

    return cellElement;
}

function getStatusCircle(status) {
    var canvas = document.createElement("div");
    canvas.setAttribute("class", "contact-" + status);

    return canvas;
}

function clearContacts() {
    var contacts = document.getElementById("contacts");
    contacts.textContent = "";
}

function updateContactList() {
    clearContacts();
    buildContacts(contacts);
}

function mouseOverName(id) {
    var cells = mergeNameAndInfoCellsToArray();
    Array.prototype.forEach.call(cells, function (cell) {
        if (cell.id != id) {
            cell.style.opacity = ".25";
        }
    });
}

function mouseOutName() {
    var cells = mergeNameAndInfoCellsToArray();
    Array.prototype.forEach.call(cells, function (cell) {
        cell.style.opacity = "1";
    });
}

function mergeNameAndInfoCellsToArray() {
    var nameCells = document.getElementsByClassName("contact-name");
    var infoCells = document.getElementsByClassName("contact-info");

    var cells = Array.prototype.slice.call(nameCells).concat(
        Array.prototype.slice.call(infoCells)
    );

    return cells;
}
