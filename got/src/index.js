import charactersJson from './characters.json';

const charactersWithImages = charactersJson.characters.filter(
  (c) => c.characterImageThumb && c.houseName
);

console.log(charactersWithImages.length);

function buildTable(container, characters) {
  const table = document.createElement('table');

  const trHead = document.createElement('tr');

  const th1 = document.createElement('th');
  trHead.appendChild(th1);

  const th2 = document.createElement('th');
  th2.innerText = 'Character Name';
  trHead.appendChild(th2);

  const th3 = document.createElement('th');
  th3.innerText = 'House Name';
  trHead.appendChild(th3);

  const th4 = document.createElement('th');
  th4.innerText = 'Actor Name';
  trHead.appendChild(th4);

  table.appendChild(trHead);

  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];

    const tr = document.createElement('tr');

    const td2 = document.createElement('td');
    const img = document.createElement('img');
    img.src = character.characterImageThumb;
    td2.appendChild(img);
    tr.appendChild(td2);

    const td3 = document.createElement('td');
    td3.innerText = character.characterName;
    td3.classList.add('characterName');
    tr.appendChild(td3);

    const td4 = document.createElement('td');
    td4.innerText = character.houseName;
    tr.appendChild(td4);

    const td = document.createElement('td');
    const a = document.createElement('a');
    a.href = 'https://www.imdb.com' + character.actorLink;
    a.innerText = character.actorName;
    td.appendChild(a);
    tr.appendChild(td);

    table.appendChild(tr);
  }

  container.appendChild(table);
}

buildTable(document.body, charactersWithImages);
