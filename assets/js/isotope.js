function seededRandom(seed) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return () => {
      h += h << 13; h ^= h >>> 7;
      h += h << 3;  h ^= h >>> 17;
      h += h << 5;
      return (h >>> 0) / 4294967295;
    };
  }
  
  // Shuffle an array using seeded RNG
  function shuffleWithSeed(array, seed) {
    const rng = seededRandom(seed);
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
  const plainAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
  
  // Generate cipher key from seed
  function getCipherKey(seed) {
    return shuffleWithSeed(plainAlphabet.split(''), seed).join('');
  }
  
  // Decrypt text using seed
  function decrypt(cipherText, seed) {
    const cipherKey = getCipherKey(seed);
    return cipherText.split('').map(char => {
      const index = cipherKey.indexOf(char);
      return index !== -1 ? plainAlphabet[index] : char;
    }).join('');
  }
  
  // Export functions if used in module system (Node.js or bundler)
  if (typeof module !== 'undefined') {
    module.exports = { encrypt, decrypt };
  }

  
  function sendEmail() {
    emailjs.send("service_5a11k9w","template_8vgskxk",{
        subject: "Hello World- Python full stack developer course enquiries",
        name: document.getElementById("name").value,
        message: document.getElementById("message").value,
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        mobno: document.getElementById("mobno").value,
        email: "helloworldpfsd@gmail.com",
        })
      .then(function(response) {
        alert("Email sent successfully!");
      }, function(error) {
        alert(error);
        alert("Failed to send email: " + JSON.stringify(error));
      });
  }