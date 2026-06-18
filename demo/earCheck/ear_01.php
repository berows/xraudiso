<?php
include_once('../common.php');
include_once('../head.php');
include_once('sub_04.php');
?>

<link rel="stylesheet" href="../css/style.sub.css?ver=<?= time() ?>">
<link rel="stylesheet" href="../../css/style.css">
<script src="https://cdn.tailwindcss.com"></script>
<script>
    tailwind.config = {
        corePlugins: {
            preflight: false,
        }
    }
</script>
<nav></nav>
<!--
<div class="cont_wrap no-padding" data-aos="fade-up">
    <h4>검사</h4>
    <h1>AI 귀 건강 분석</h1>
</div>
-->

<div class="container">
    <div id="root" style="width: 100%; min-height: 800px; position: relative; z-index: 1;"></div>
    <script type="module" src="index-OtGpDPBQ.js?ver=<?= time() ?>"></script>
</div>

<script>
    const video = document.querySelector('video');
    video.muted = true;
    video.play().catch(error => {
        console.error('Autoplay failed:', error);
    });
</script>
<script type="text/javascript">
    $(".hover").mouseleave(
        function() {
            $(this).removeClass("hover");
        }
    );
</script>
<script src="../exam/js/slider.min.js"></script>

<footer></footer>
<script src="../../js/components.js"></script>

<?php
include_once(G5_PATH . '/tail.php');
?>
