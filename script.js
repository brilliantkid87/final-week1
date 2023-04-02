// Contact
function getData(){
  let name = document.getElementById("name").value
  let email = document.getElementById("email").value
  let phone = document.getElementById("phone").value
  let subject = document.getElementById("subject").value
  let message = document.getElementById("message").value

  // validation
  if(name == "") {
      return alert("Nama Harus Di Isi")
  } else if(email == "") {
      return alert("Email Harus Di Isi")
  } else if(phone == "") {
      return alert("No Telpon Harus Di Isi")
  } else if(subject == "") {
      return alert("Subject Harus Dipilih")
  } else if(message == ""){
      return alert("Pesan Harus Di Isi")
  }

  const destination = "brilliantkid87@gmail.com"
  let a = document.createElement("a")
  a.setAttribute('href', `mailto:${destination}?subject=${subject}&body= Hallo nama saya ${name} , saya ingin ${message}, bisakah anda menghubungi saya di ${phone}`)

  a.click()

  let data = {
      nama: name,
      email: email,
      telp: phone,
      subject: subject,
      pesan: message,
  }

  console.log(data)
}


// Add Blog

let blogs = [];

const form = document.getElementById('my-form');
const cardList = document.getElementById('card-list');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const description = document.getElementById('description').value;
  const image = document.getElementById('image').files[0];

  const technologies = [];
  const checkboxGroup = document.getElementById('checkbox-group');
  const checkedCheckboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]:checked');
  checkedCheckboxes.forEach(function(checkbox) {
  technologies.push(checkbox.value);
  });

  const Blog = {
    name,
    startDate,
    endDate,
    post: getDistanceTime(startDate, endDate),
    description,
    technologies,
    image
  };

  blogs.push(Blog);
  console.log(blogs);
  renderBlogs(blogs);
});

function renderBlogs(blogs) {
  document.getElementById("card-list").innerHTML = "";
  for (let i = 0; i < blogs.length; i++) {
    const Blog = blogs[i];
    const descriptionWords = Blog.description.split(" ");
    const showViewMore = descriptionWords.length > 20;

    let shortDescription = Blog.description;
    let longDescription = "";

    if (showViewMore) {
      shortDescription = descriptionWords.slice(0, 20).join(" ");
      longDescription = descriptionWords.slice(20).join(" ");
    }

    document.getElementById("card-list").innerHTML += `
    <div class="card">
        <div class="image-wrapper">
            <img src="${Blog.image ? URL.createObjectURL(Blog.image) : "https://via.placeholder.com/150"}" alt="${Blog.name}">
        </div>
        <div class="info-wrapper">
            <h2>${Blog.name}</h2>
            <h5>duration : ${Blog.post}</h5>
            <p>
                ${shortDescription}
                ${showViewMore ? `
                    <a class="btn-view-more" href="blog-detail.html" target="_blank">View More</a>
                    ` : ""}
            </p>
        <div class="tech-wrapper">
            ${Blog.technologies
                .map(function (tech) {
                    if (tech === "Node.js") {
                    return '<i class="fab fa-node-js"></i>';
                    } else if (tech === "React.js") {
                    return '<i class="fab fa-react"></i>';
                    } else if (tech === "Angular") {
                    return '<i class="fab fa-angular"></i>';
                    } else if (tech === "Vultr") {
                    return '<i class="fas fa-server"></i>';
                    }
              })
              .join("")}
        </div>
        <div class="buttons">
            <div class="input-btn">
                <button class="action-btn">Save</button>
                <button class="action-btn">Cancel</button>
            </div>
        </div>
    </div>
  `;

    if (showViewMore) {
      const card = document.querySelectorAll(".card")[i];
      const btnViewMore = card.querySelector(".btn-view-more");
      const viewMore = card.querySelector(".view-more");
      btnViewMore.addEventListener("click", function () {
      viewMore.style.display = "inline";
      btnViewMore.style.display = "none";
      });
    }
  }
};

function redirectToBlogDetail(id) {
  window.location.href = `blog-detail.html?id=${id}`;
}


function getDistanceTime() {

  let startDate = Date.parse(document.querySelector('#start-date').value)
  let endDate = Date.parse(document.querySelector('#end-date').value)

  let distance = endDate - startDate

  let miliSecond = 1000
  let secondinHours = 3600
  let hoursinDay = 24
  let dayInMonth = 31
  let monthInYear = 12

  let distanceYear = Math.floor(distance / (miliSecond * secondinHours * hoursinDay * dayInMonth * monthInYear))
  
  let distanceMonth = Math.floor(distance / (miliSecond * secondinHours * hoursinDay * dayInMonth))

  let distanceDay = Math.floor(distance / (miliSecond * secondinHours * hoursinDay))

  if (distanceYear > 0) {
    return `${distanceYear} year`
  } else if (distanceMonth > 0) {
    return `${distanceMonth} month`
  } else if (distanceDay > 0) {
    return `${distanceDay} day`
  }
};