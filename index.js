
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/generate', (req, res) => {
  const prompt = req.body.prompt.toLowerCase();

  let template = '';

  if (prompt.includes('platformer')) {
    template = getPlatformerTemplate();
  } else if (prompt.includes('shooter')) {
    template = getShooterTemplate();
  } else if (prompt.includes('runner')) {
    template = getRunnerTemplate();
  } else {
    return res.json({ success: false, message: 'Unsupported game type' });
  }

  res.json({ success: true, code: template });
});

function getPlatformerTemplate() {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Platformer</title>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
</head>
<body>
<script>
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: { default: 'arcade', arcade: { gravity: { y: 300 }, debug: false }},
  scene: {
    preload: function () {
      this.load.image('sky', 'https://labs.phaser.io/assets/skies/sky4.png');
      this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
      this.load.image('star', 'https://labs.phaser.io/assets/sprites/star.png');
      this.load.spritesheet('dude', 'https://labs.phaser.io/assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
    },
    create: function () {
      this.add.image(400, 300, 'sky');
      const platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, 'ground').setScale(2).refreshBody();

      const player = this.physics.add.sprite(100, 450, 'dude');
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      this.physics.add.collider(player, platforms);
    },
    update: function () {}
  }
};

new Phaser.Game(config);
</script>
</body>
</html>`;
}

function getShooterTemplate() {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Shooter</title>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
</head>
<body>
<script>
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: function () {
      this.load.image('background', 'https://labs.phaser.io/assets/skies/deepblue.png');
      this.load.image('player', 'https://labs.phaser.io/assets/sprites/arrow.png');
    },
    create: function () {
      this.add.image(400, 300, 'background');
      const player = this.add.sprite(400, 500, 'player');
    },
    update: function () {}
  }
};

new Phaser.Game(config);
</script>
</body>
</html>`;
}

function getRunnerTemplate() {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Runner</title>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
</head>
<body>
<script>
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: function () {
      this.load.image('bg', 'https://labs.phaser.io/assets/skies/cavern2.png');
      this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
    },
    create: function () {
      this.add.image(400, 300, 'bg');
      const player = this.add.sprite(100, 300, 'player');
    },
    update: function () {}
  }
};

new Phaser.Game(config);
</script>
</body>
</html>`;
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
