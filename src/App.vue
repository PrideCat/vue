<template>
  <div id="app">
    <router-view/>
    <div v-if="isCollapse" v-html="styleDom"></div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
    	const isCollapse = this.global.isCollapse;
    	const styleDom = `
	    	<style>
	    		.theLogin{
					background-image: url("data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MiA3OS4xNjA5MjQsIDIwMTcvMDcvMTMtMDE6MDY6MzkgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDAwNjZiY2ItNWYwMC0wYzRiLWIyZjMtMzI4Nzk0NzhhZmJhIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE5QkI0RDM2QTM1QzExRThCNUE3ODQ2Mjg1RUUzNDBGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE5QkI0RDM1QTM1QzExRThCNUE3ODQ2Mjg1RUUzNDBGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmEyYjQxMzUwLWI3NzgtNmI0Mi04ZDEwLTBhNDI5YzVhMjk0ZCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpkMDA2NmJjYi01ZjAwLTBjNGItYjJmMy0zMjg3OTQ3OGFmYmEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDg8QDw4MExMUFBMTHBsbGxwfHx8fHx8fHx8fAQcHBw0MDRgQEBgaFREVGh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCAReAu4DAREAAhEBAxEB/8QAjwABAQEBAQEBAAAAAAAAAAAAAAECAwQFBgEBAQEBAQEBAAAAAAAAAAAAAAECAwQFBhABAAIBAQQHBgUEAQUBAAAAAAECEQORUwQUITFBUZLSE2Fx0RJSBYGxMqIVocEiQjPhYoIjQ3IRAQACAgEEAwEBAAIDAQAAAAABEQISYTFRAwQhQRMUBXGxkTJCUv/aAAwDAQACEQMRAD8A/AV4bh8f8VPDD9LGMPuTjC8tw+6p4YXWOyVCTw3D4/4qeGEnGOyxEMcvw+6p4YZ1hrWDluH3VPDCawawvLcPuqeGDWDWDluH3VPDBrBrBy3D7qnhg1g1g5bh91TwwawusHLcPuqeGE1g1g5bh91Twwawawctw+6p4YNYNYOW4fdU8MGsGsHLcPuqeGDWDWDluH3VPDCawusHLcPuqeGDWDWDluH3VPDBrBrBy3D7qnhg1g1hY4bh91Twwawawctw+6p4YTWDWDluH3VPDBrBrC8tw+6p4YNYNYOW4fdU8MGsGsHLcPuqeGDWDWDluH3VPDBrBrBy3D7qnhhNYNYOW4fdU8MGsLrBy3D7qnhg1g1g5bh91Twwawawctw+6p4YNYNYOW4fdU8MJrBrBy3D7qnhg1hdYXluH3VPDBrCawctw+6p4YNYNYOW4fdU8MJrC6wctw+6p4YNYNYOW4fdU8MGsGsHLcPuqeGDWDWCOG4fdU8MJUGsLy3DbqnhgqDWDluG3VPDBUGsHLcNuqeGCoNYOW4bdU8MJUGsHLcNuqeGCoNYOW4bdU8MFQusHLcNuqeGCoNYOW4bdU8MFQawvLcNuqeGCoNYTluG3VPDCVBrBy3DbqnhgqDWDluG3VPDBUGsLy3DbqnhgqF1g5bht1TwwlQawctw26p4YKg1g5bht1TwwVBrBy3DbqnhgqDWF5bht1TwwVBrBy3DbqnhhKg1g5bht1TwwVBrBy3DbqnhgqF1g5bht1TwwlQawctw26p4YKg1g5bht1TwwVBrBy3DbqnhgqDWDluG3VPDBUGsdjluG3VPDBULrHZY4bht1TwwlQmsdjluG3VPDBUGsdjluG3VPDBUGsdjluG3VPDBUGsdjluG3VPDBULrHY5bht1TwwlQax2OW4bdU8MFQax2OW4bdU8MFQax2XluG3VPDBUGsHLcNuqeGEqDWDluG3VPDBUGsOXEz9v4enz6tKRHZHyxmfdDWHjnKfiHPy54YRcvg8bxleIma00q6el9MRGZ98vd4/Xxx/5fH8/szn8R8Q8fpaX0V2Q7ax2eU9LS+iuyDWOwelpfRXZBrHYPS0vorsg1jsHpaX0V2Qax2D0tL6K7INY7B6Wl9FdkGsdg9LS+iuyDWOwelpfRXZBrHYPS0vorsg1jsHpaX0V2Qax2D0tL6K7INY7DrGjo4/RXZC6x2YPR0forsg1jsJOjo5j/AArshNY7D9RXqYh+hlpWQHNhtQEAUAAAAABUAUBEAFgFAAQBQAABAAAAARVAAAQAAEFAAFEAFAAFEAAAAFQAAAAEUAAQAAABVAhAAABQEAAUQJmIjM9ER1yI+Xxv3vT0804fF79t/wDWPd3vT4/XmfmXz/P70R8Y/Mvi6utq615vqWm1p7ZezHGIiofKzznKblhWQAAAAAAAAAAFjrB1VgBmf1wL9P01etyh+glpWQHOetmW4VAQBQAAAAAFQBQEQAUFAAQBQAABAAAAARVABQRBQEUAEAUUQAAABRAAAABUAAUEBQBAAQAAABVAQAAAUBAAFeTi/uXDcNmLT8+p9Fev8e50w8M5PN5vaw8fMvicZ9y4nipxafl0+zTr1fj3vbh4oxfI83s5eTr0eR0ecAAAAAAAAAAAABqn6hJdFZAY/wDoL9P01etxh+hltpgBi3WzLUIiqgCgAAAAACCigAAAKgAIAoAAAgAAACiCgAoIgoogACAKKIAAAAogAAAAqAAKAAAIACACioACgIAAAAKg8/E8bw3DR/7L/wCXZSOm0/g6YeOcujj5fPhh1l8fi/vPEa2a6X/q0/Z+qfxerD14jr8vl+b3ssviPiHz3oeIAABEAAAAAAAAAAAG9OOmZWElsZAcs/5Z9qNv07k++6NMAM2SWoZZVUAUAAAAAAQUUAAABUABAFAAAEAAAUAQWAAUEQUUAARAFFAAEABBQABQBAAAFAAAEABABRQAABAAAB5+J+4cLw+Y1L5t9FemW8fFll0cPL7GGHWXyeK+98RqZrox6VO/rtterD14jr8vm+X3ssvjH4h86Zm0zMzmZ65l3eKZsVAAAAAAEQAAAAAAAAAdKR0KzLQiTOIkIckbfqHJ99uOpYZlVRJ6klYYhlpUAUAAAAAAQUUAAABUAABFAAAEAAAUAQUAABBQBQBEAUUAAQAVAAAFAEAAAAUAAQWAMIGABQAABAtatYmbTERHXM9EFJMxHV4OI+88JpZimdW3/b1bXbHwZT1+Hk8nvYY9Pl8zifu3F62Yi3p0+mnR/XrenDw4w+f5fczy4h4nV5BQAAAAAAAAABEAAAAAAAHWIxCsKDN56BYc0afqHJ99qqwktKyAww2IAoAAAAAAgooAAACoAACKAAAIAAKKAIgAKAIKAKAIgCigACACoAAAoAgAAACgACCwAgAoIKTMRGZnER1zIkzTya33TgtL/f557qdP9ep1x8OUvPn7njx+7/4fP1/vutbo0aRSPqt0z8HbH14+3i8n+hlP/rFPn63Ea+tOdW83989Gx3xxiOjxZ+TLLrNuasAAAACoAAAAAAAAAAiAAAAC1jMwEuqsAMXnpwNQwiv1Dk++tesgltpgBm3WzLUIyoKAAAAAAIKKAAAAqAAAiud+I0Kfq1K198wtSxPkxjrMOVvuXBV69WJ90TP5Qukuc+144+3K33jhI6vmt7o+Mr+cuc+7hy5z970f9dK0++Yj4r+Uuc+/H1DE/fLdmjEe+3/RfyYn3+GJ+96/Zp0j35n+6/lDM+9l2hmfvXF91I/CfiflDP8Adnwz/McZ312L+UJ/b5E/luN+qNkH5wn9nk7n8tx31x4YPzg/s8nc/luO+uPDB+cH9nk7n8vxv1Rsg/KD+zyd1/mOM767E/KF/t8jUfeuLjspP4T8T8oWPez4aj73xHbSn9fin4w1/fn2hqPvmp26UT7pwn48tR/oT2dK/fa/7aMx7rZ/sn48tx/oR2br974btpeNk/3T8Zbj38O0ulfvHBT12mvvif7ZZ/LJuPd8brX7jwVurWr+OY/NPzy7Okez45+3WvEcPb9OpWfdaJZ1l0jyYz0mHRlsABUAAUAQAAABQABBYAmYiMzOI7xJl59T7hwen+rWrnuj/Kf6Zbjx5T9OOXsePHrLy6v33h6/8dLXn2/4x/d0j15+3nz/ANDGOkW8er974u/RSK6ceyMz/V1j18YeXP3856fDxauvras51L2v75dYxiOjy5+TLLrNsNMAAJgBFAAAAAFQAAAAAAAAABEAAG9OOuVSWxkBymczMo3CA/UOT74DpDTACWjoSVhlloARQAAAABBRQAAHDU43hdP9WrXPdHTP9FjGXLLz4Y9ZefU+9cPX9FbXnZCx45cMvdxjpFvNqfetef0UrX35n4NR44cMvey+oee/3Ljb/wD0mI7qxEfk1pDjl7Pkn7cb6urf9d7W98zLVOM5zPWWVZAAAAAAAAAAAAAAAAAAAAare9f02mvunCUsZTHR1px3GV6ta34zn82Z8ePZ1j2PJH3LtT7xx1eu1be+I/thmfDi6x7vkh2r991o/XpVn3TMfFmfBHd1j/Qy+4dq/fdP/bSmPdMT8Gf557ukf6EfcOlfvfCT11vH4R8Wfwybj38OW4+8cDP+0x76yn45Nx7vj7tR924De/tt8E/HLs1/Z4u//Z/KcBvf6W+B+WXY/r8fc/leA3v7bfA/HLsf2eLv/wBpP3fgI/8ApM/+M/A/HJP7fH3Yn71wUdXzT7o+K/hkzPvePli333h/9dO8+/Ef3lf55Yn/AEMfqJcrffp/10fxm3/RqPX5c5/0e0ON/vfFz+mtK/hMz/WWo8GLnPv5z0pwv9z46/XqzH/5xH5Nx4sY+nHL2vJP24X1NS85vabT3zMz+bcREOOWUz1llWQAAAAAAAAEwAigAAACoAAAAAAAAAgCDrWMQrEqCWnESEOSNgP1Dk++A1WehYZlpUEGO1lsARQAAAABBnU1dLTjOpaKx7ZwtJlnGPWXj1fvHDU6KROpPs6I/q1GEvLn7mEdPl49X7xxNv0RGnHs6Z/q1GEPNl7uc9Ph5dTX19T/AJL2t7JnobiIefLyZZdZcxgAwqKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACYARQAAABUAAAAAAAAKxmQl1VgQY1J7BYYRoB+ocn3wFrPSQS20wAzaOlmWoRFEUAAAtatYzaYiI65nogSZrq8Wv8AduG0+imdS3s6I2tRhLzZ+3hHT5eDW+68VqdFZjTr3V69rcYQ8eft5z0+Hkta1pzaZmZ65npaeaZmeqAAAqoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiKAAAAKgAAAAADWnHaMy2qAOVpzOWW4QAH6hyffAEG4nMNsqITGYSSGGWxFAY1dfR0a/NqXise3rWIYz8mOPWXzuI+89caFf/O3wbjB4vJ7v/wCYfP1dfW1pzqXm3v6tjcRTx5+TLLrLmMAAAKqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIigAAACoAAAA6xGIwrACWnEBDmjaIAP1Dk++AINVnsahJaVlUGLRiWZbhz1dfS0a/NqWise0iLZzzjGLl8zifvF7ZroR8sfXPXsbjB4PJ7kz/wCr5173vabXtNrT1zPS28c5TM3KCAAAKqAAAAAAAAAAAAAAAAAAAAAACigAAAAAAAAAAAAAAAAAgCAAAAAAAAAAAAAAAAAAAAAACIoAAAAqANUjpz3CS2rIDneenHcjUIKAiD9Q5PvgCBHRKjo0wTaKxMzOIjrmUSZp87jPukRWa8PHzTH+89X4Q1o8nk9uvjF8fU1NTUt82pabWntlp4cspym5ZEAAAMKigAAAAAAAAAAAAAAAAAAKKAAAAAAAAAAAAAAAAAAAAAAAAAAACAIAAAAAAAAAAAAAAAAAAJgBFAAAFR0rGIViVAmcRkHJGwAAH6dxffAEAHLX43R0Ixac37KR1t4xbh5vNjh/y+XxHF62vP8AnOK9lY6nSIp8zyebLPq4q5OF64tjs7EVEABUUAAAAAAAAAAAAAAAAAFUAAAAAAAAAAMAYAwBgAAAAAADAGAMAYAAAAAAAAAAABEAAAAAAAAAAAAAAAAAEARQGqRmfcqTLasAMXnsRqGRQAAH6dxffAJmIjM9SD5nGfdYjOnw85nt1Pg3GLwef2/rH/y+ZF7fP80zmZ65ntdHgmbd1AGdSuY9sIOKCqgAAAAAAAAAAAAAAACqAAAAAAAGAMAAAAAAAAAAAAAAAAAAAAAAAYAwAAAAAAAACIAAAAAAAAAAAAAAAAIiutYxCsSqokziMg5SjYAAAD9O4vvs6mpTTpN7z8tY65Gcsoxi5fF437hqa8zSv+Ol3ds+90jGny/P7M5/EdHkaeYRXXSt0Y7upRtQByvXE+yURkAAAAAAAAAAAAABRQAAAAAAMAAAAAAAAAAAoAAAAAAAAAIAAAAAAAAABgAAAAAAAEAQAAAAAAAAAAAAAapXM5EmW1ZAc7z2I1EMo0KgAAD9Hr8Rp6GnN9ScR2R2zPscoh9zyeSMIuXwuK4vV4i+bdFY/TTsh0iKfJ8vmnOflxVyEAFiZicwo7xOYyqAJauYwDigAAAAAAAAAAAKKAAAAABgAAAAAAFAAAAAAAAAAAAAAAAAAAAAAABAAAAAAMAAAAAAAgCAAAAAAAAAABEZnAOsRiMKwAlpxGQhyZdAABQEAdOI4jU19Sb3n3R2RCRFOnk8k5zcuYwAAAqo3p27NhA6KAMalf8AaPxSRzAAAAAAAAAUUAAAADAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAYAAAAABAEAAAAAAAAG6VxGRmZaVAGLzmfZCNRDIqIoAAAqCKAAAqoAA7Vt80e3tUUAHG1fln2diCAAAAAAKKAAAABgAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAMAAAAAAgCAAAAADVK5n2CTLorKAl7Yj2osQ5jQACIoAAAAACqgAAC1t8s+ztB2UAS1fmjAOMxjoQAAAAVQAAAAAAAABQAAAAAAAAAAAAFAAAAAAAAAAAAAAABAAAAAAAAAAAABAAAAAAAAAARAAABYjM4B0iMRhWFBJnEZBymczlGwAAAERQAABUUAAAAAHTTt2T+CwOigDGpXPTHWg5IACigAAAYAAAABQAAAAAAAAAFAAAAAAFwBgDAGAMAYAwBgDAGAMAYBAAAAAAAEAAAAAAAAAEAAAAwAAAACAIAOla4j2qzMtCAOd7ZnHYjUQyKAAAAAgCKKigAAAAAAA7UtmPao0oA5Xpjpjq7UoZAAAAwAAAACgAAAAAAAAKAAAALgDAAAAAAAAAAAAAAAAAAAGAMAgAAAACAAAAAAAACAAAAYAAAABule2fwEmWhkBm9sdHaLEOaNAAAAAAAICgAAAAAAAAsTMTmAdqzExmGhQAcr1xPsQZAAAAABQAAAAAAAFAAAFwAAAAACgAAAAAAAAAAAAAAAAAgAAAAGAQAAABAAAAAAABAAAAAAapXPTPUJMtqyAlpxCLEOSNAAAAAAAAAAAAAAAAAAANVt8s+ztUdc5UUEmMxgHK1JrPsQQAAFAAAAAAAAUAAXAAAAAKAAAAAAAAAAAAoAIAAAAAAAAAAAIAAABgEAAAQAAAAAAAQAAGq0z7hJltUBCZxGQcpnMo2iAAAAAAAAAAAAAAAAAACqANUvjonqB1UAJiJjEg5WrNZ9iDIKAAAAAAAoAAuAAAAUAAAAAABQAAAAAAAAAAAAAAAAAQAAAAAAQAADAIAAAgAAAAAAgNVrn3CTLorICT0CudrZn2I1EIACIAAAAAAAAAAAAAAAAKoAAA3S+OieogdVAEmImMSDlas1n2AiAAAAAoAAuAAAUAAAAABQAAAAAAwBgDALgDAGAMAYAwCYAwBgAAAAAAABAAAAABAAMAgAACAAAAC1rn3Kky6DKggOdrZ9yNRDIoAACIAAAAAAAAAAAAAAKoAAAAA6UvjonqUdFACYiYxIOVqTHuQZQAFAAFwAACgAAAAKAAAAGAXAGAAAAAAAAAAAAAAAAAMAYBMAAAAAAIAAAAIABgEAAAQAarTPTPUJMumFZAQHO1s9XUjUQyKAAAAAiAAAAAAAAAAAACqAAAAAAKDdL46J6lsdFAAHO1MdMdSUMAAAoAKAAAAAoAAAYBcAAAAAAAAAAAAAAAAAAAAAAAAAYBMAAAAAIAAAAIACAAA3WnbOwSZbEABHK1s+4aiERUAAAAAABEAAAAAAAAAAFUAAAAAAUAAGqXx0T1KOqgADFtPPTGwoYwgAAoAAACgABgFwAAAAAAAAAAACgAAAAAAAgAAAAAAAAAAGATAAAACAAACAAYz1A3WmOvrGZlpUECZiOsVytaZ9yNRCAAAgAAAAAAIgAAAAAAAAqgAAAACgAAAAA1W019yjrExMZhRQAS1In394Oc1mOtBAAAFAADAKAAAAAAACgACgACgAAAAAAAAAgAACAIAAAAAAACYAAAAQAAWKzIW3FYjqVlREBJtECuc2mUaRAAAAABAAAAAARAAAAAABVAAAAAFAAAAAAUAWszE5B2raLe/uUUFBJiJ6wYtpzHUDAAAGAUAAAAAAFAFAFAAQAAAwBgDAGAMAYAwBgAAAAAUAQABEAAAAAABMAAAA3WnfsEmWhkABm1oj3i05zmelGkAAQAAAAAQAAAAAEQAAAAVQAAAABQAAAAAFAFABQbrqdk7VHQBQBm1In3g5zSY93egYAAAAABQBQBQEAAMAoAAAAAAAAAAAAAAAJgAAAAUQABEAAAAAwBFJn3CW6RWIVLUQQQGLX7I2jUQyioACAAIAAAAAIAAAAACIAACigAAAAAoAAAACgCgAoAANVvMe5R0i0T1KKBgRQYtpxPV0FKxMTHWggAKAKKAgABgFAAAAAAAAAAAAAAAAAAAAABMAAAACiAIgALETPUDcUiPaqWogAIk2iBac7WmUapEAAEABAAEAAAAEAAAAABAEAFUAAAAAUAAAABQBQAUAABQAjPYDrW/ftUbEAAMKMTpx2IrE1mOtAVQQAwCgAAAAAAAKAAAAAAAAAAACAAAAAAACYAAAFWKzKI1FI7elUtRAAAGLX7tqLTEigACAACAAgACAAAACAAAAAAgKAAAAACgAAAAKAKACgAAKAGAUAFi0x1A6VvE+yVGlQFAAZnTieroKGZpaPaggAAAAACgACgAAAAAAAAAAAAAgAACAAAAACxSZ9gltRSIC1VBABAZm8dgtMzMz1oqAAmAAAEAAEABAAEAAAAEAAAAAAAAAABQAAAAFAFABQAAFAFiAAAAAUFi0x7lHSLxPsUUFwIAATWJ64BmdPukVia2jsBAAUAADAGAMAAoAAAAAAAIBgDAGAAAAQAFisyFtRSO0S2oiI6hAAEwADM3iOrpRaZmZkVEEAAAAmAQABAABAAQABAAAABAAAAAAAAAUAAAABQBQAUAABQBYgAAAAFAVQQBqLTHUDcakdvQto1HSCigACokxE9cAzOnHYFp6cotp8sx2AAAAAAAAAAAAAAAAAAAfLM9gL6ciWvyR2haxEQqKCIAAE9AMzeOxFpiZmesVAABREQAAACYBAAEAAEABAAEAAAAEAAAAAAABQAAAFAFABQAAFAFAAAABRRQEAUAAFiZjqBqNSe1RuL1lRQBDAKAACYiewE+SvcCenHeUtnpz3lFp6diiz5LdwJ8tu4D5bdwGJ7gMT3AfLbuA+W3cB8lgtfkkLPT9pSWvpwFr8te4LXEAACAIAADM2iEWmZvPZ0C0mUEAABAABRBBAAAAEAAQAAQAEAAQAAAQAAACAAAUAAABQBQAUAABQBQAAAUAUVAFAAAAUAUAFiZjqBqNSe0Kai9VRrMAAAAAAKAAAAgAAAAgAgAAAoABMwIzN4RaSbz2BTM5nrFQAEAAQAAAQABFBEAAABAAEAAEABAAEAAAEAAAABQAAAAFFABQAAFAFgAAAFAFFQBQAAAFFAABQAAAAWLW71Go1J7gpY1IEX5q96i5gAAAAADAGAMAAAAAmYBPmr3oJ88BSTeQpJtbvFRAAAABAAAQBAAABAAEUEQAACQQABAABAAQBAAAABAAAAUAAABQBQUAABQBYAAABQBRUAUAABQBQMAoAAACgAAAAC4FMCKB81u8F+e3eB89go+eQpfnkSj55Ck+eRaPnsFHz27wpPmnvABMAYFQQAAAAAQAAATAAIAAgAAgACKCIAABIIAAgAAgIAAgAAAgAAKAAAAoAoAKAAoAQCgAAoAoqAKAAAooAAKAAAAoAAAuAMAAAAoAAACgAAAgAAAgAAGAMAgAAACAAACAAAgCAACAAIoIgAAJIAACACAAgACAAACAoAAAACiwACgAAKEAoAAAKKKgCgAAKKAACgAAKAAALgAAAFAUAAAAAAAAAAAAAAAEEAAAwCAAAAIAAIAACAIAAIAAioIAAAkgAIAAIBIIAgAAAAAAAAKAKCgAAKAKAAACiioAoAACigAoAAACgAC4AABQAFAAAAAUAAAAAAAAAEAAAAEAEAAwCAAAIAAAIACAIAAIAAioIAAAgACAACAgACAAAAAAAAosAAoACgCwAAACiigIoAACigAoAACgACiggCgKAAAAAoAAAAIAAAAACgAAAAgAAAAggAAqCAACAACAAgCAACACiCCAAEggACACASCAIAAAAAACgCgoAAChAKAACgKoIoAACigAoAACgACgAAoCgAAKAACALgAAAAAAAAAADAIAAKAACAACCAAAgAACAACAAgCAACACiIgAAJIACAACAgACAAAAAoAoAKAAoAoAAAKKKigAAKKACgAAKAAKACgKAAAoAAIuAAAAAAAAAAAAAAAAAMAgAoAAIAAIIACAAAIAAIACAIAAIAioIAAAgACACAAgACAAAAoAoKAAoAQCgAAooqEAoAACigoAACgACgAoCgAAKACKAAAACqAAAAAAAAAAAIgAAAAgAoAIAAIIACAAAIAAICAIAAJIACKggACSAAAgAgIAAgAAAKKACgAKAKAACgKoIoAACigAoACgACgAoCgAKACLgAAAFUAAAAAAAAAAAAAAAAARAAAwCACgAgAggAIAAAgAgAIAgAAgAoiIAACAAIAIACAIAACgCgoACgCwAAACiiooAACigAoACgACgAoCgAKACKAACqAAAAAAAAAAAAAAAAAAAAAIgAAgAoAIAIIACAAAIAIACAIAAIAioIAASCAAIAICAAIACiwACgAKAKAACgKoIoAACigoAACgCgAoCgAKAogAACqAAAAAGAMAoAAAAAAAJgDAAAAAAAIgAAAgoAIAIIACAAIAAICAIAAIAKIiAAAgACACASCAICgCgoAAChAKAACiiooAACigAoACgCigigKAAoCiAAKoAAAAAYBQAAAAAAAAAAAAATAAAAAAAIgAAgoAIAIIAKggAgAgAIAgAAgCKggACSAAgAAgIAAACgoACgCgAAoCqCKAAooEAoACgACgAqgAKAogACqAAAAGAUAAABQAAAAAAAAAQAAATAAAAAAIgAAgoAIAiACAAAIAJIAIAgAgAoiIAACAAIAICAAAsAAoAChAKAACiiooAACigoAACgCwACqAAAoIoAKoAAAAoAAACgAAAAAAAAAAAAAgAAAgAAAAIgAgAoIAAiBIIAAgAAgIAgAAgCKggACSAAgAgEggAKCgAKALAAAKAqgigAAqhAKAAoAooIoCgAKCKACqAAAAKAAAoAAAAAAAAAAAAAAAAAIAAIAAAACIAIAKCACCACoIAIAJIAIgAAgAoiIABIIAAgAgIACgoACgCgAAoChAKAAooAKAAoAsAAqgAKAogCqAAAAKAAAoAAAAAAAAAAAAAAAAAAAIAAIAAAACIAIKACAIgSCAAIAIACAIAJIACCAAAgACACAdoEAAoAChAKAACiiooAACiwCgAKAKKCKAoACqIAAqgAACgAKAAAAAAAKAAKAAACAIAAAAAAAAgAgAAAIgAAgoIAIIAKggAgAkggCAACAIqCAAJIACACAAAoAACiwAACgKoIoACigQCgAKALAAKoACgigAqgAACgAKAAAAAAKAKAAYEMAYAwAKAACIAAAAAAAgAgAAAIgAgAoIAiBIIAAgAkgAgCACACiIgAEggCAACAAoACgCgAAoChAKAAooKAAAoAoKAoACrAgACqAAKAAAoAAAAoAoBgRQAAAAAAATAAoAIgAAAACAACAAAiABIIKCACCAgACAACAgCACSAAggAAIAAgAgAKAAoAoAAKKKigAAKLAKAAoAooIoCgKAogCqAAAKAAoAAAAoAoIoAAAAAAAAAAAIAKCIAAAAAgAgAAAIgAgoAIIIAKggAgAkggCAACAIqCAAIAAgAgAKAAoQCgAAooqKAACqEAoACgCwACqAAoIoAKoAAoACgAAACgCgigAAAAAAAAAAAAAgAoIgAAAACACAAAiACACggCIEggACACSACIAAIAioIAAkgAIAIACgAKEAoAKAqgigAKKACgAKAKCgKAAqwIAqgAACgAKAAAAKKQIoAAAACgAAAAAgAAAAkgCoIAAAAIAIAAACIEggoIAIICAAIAIACAIAIAKIiAAkgAIAAICgAKLAAAKAqkCKAAooKAAAoAoKAoCgKIAqgABAKAAoAAAoAqiAAACgAAAAAAAAAgAAAgoIgAAACACSAAACIAIKACCCAgACAACAgCACSAKIiAASCAIAAAACgCwAACgKEAoACigoACgCwACqAAoIoAKoAAoACgAACgCqIAAAKAAAAAAAAAAACAAACCgiAAAAIAIAACIAIAKCAIgSCAAIAICAIAJIACCAASCAAIAAACgCgAAooqEAoACiwCgAKALAAKoACgigAqgACgAKAAAKAKogAAAoAAAAAAAAAAAIAAAIKCIAAAAgAgAAIgAgAoIAiBIIAAgAkggCACSAAioIAAgACAAAAoAoAAKKKigAAqhAKAAoAsAAqgAKsCAKoAAQCgAKAAAKKQIoAACgAAAAAAAAAAAAAgAAkgCoIAAAIAJIAAAIgSCCggCIEggACACSACIAAIAioIAAgACAAAAoAoAAKKKigAAqhAKAAoAsAAqgAKsCAKoAAQCgAKAAAKKogAAAoAAAAAAAAAAAAAIAAAIKggAAAgAkgAAAiBIIKCAIgSCAAIAJIAIgAAgCKggACAAIAAACgCgAAooqKAACqEAoACgCwACqAAqwIAqgABAKAoAAAoAqiAAACgAAAAAAAAAAAAAgAAAgoIgAAACCSAAACIEggoIAiBIIAAgAkgAiAACAIqCAAIAAgAAAKAKAACiiooAAKoQCgAKAKACqAAqwIAqgABAKAoAAAoAqiAAACgAAAAAAAAAAAAAgAAAgoIgAAACCSAAACIEggoIAiACAAIAJIAIgAAgCKggACAAIAAACgCgAAooqKAACqEAoACgCwACqAAqwIAqgABAKAoAAAoAqiAAACgAAAAAAAAAAAAAgAAAgoIgAAACCSAAACIEggoIAiBIIAAgAkgAiAACAIqCAAIAAgAAAKAKAACiiooAAKoQCgAKALAAKoACrAgCqAAEAoACgAACikCKAAAoAAAAAAAAAAAAAIAAJIAqCAAACACSAAACIEggoIAiBIIAAgAkgAiAACAIqCAAIAAgAAAKAKAACiiooAACiwCgAKALAAKoACrAgAooAAKAAoAAAopAigAAKAAAAAAAAAAAAACAACSAKggAAAgAkgAAgCBIIKCAIgSCAAIAJIIAgAAgCKggACAAIAAACgCgAAoChAKAAosAoACgCwACqAAoIoAKoAAoACgAACgCqIAAAKAAAAAAAAAAACAAACCgiAAAAIAIAACIAIAKCAIgSCAAIAJIIAgAkgAIIAACAAIAAACgCwAACgKpAigAKKCgAKAKACgKAoIoAKoAAoACgAAACikCKAAAAoAAAAAAAAAIAAAJIAqCAAAACACAAAiACACggggAIAAgAgIAgAkgCiIgAEggACACAoACiwAACgKpAigAKKCgAAKAKCgKAoCiAKoAAQCgAKAAAKAKogAAAAoAAAAAAAIAAAAIKCIAAAAgAkgAAAiACCgAgggIAAgAAgIAgAkgCiIgAEggCAACAoAChAKAACqoIoACigAoACgCgoCgAKsCACigAAoACgAAACigKIAAAAAKAAACAAAAACCgIIAAAAIAIAACAIEggoIAIICAAIAIACAIAIAKiIAAkgAIAAICgAKEAoAAKKKigAAqhAKAAoAsAAqgAKCKACqAAAKAAoAAAoAoCiAAAAAAAAAAAAAIKACIAAAAgAgAAAIgAgAoIAiBIIAAgAkgAiAACAIqCAAJIACACAAoACgCgAAooqKAAAooKAAoAooIoCgKAogCqAAAKAAoAAAAoAoCiAAAAAAAAAAAIKACIAAAAAgAgAAAIgAgoAIIIAKggAgAgIAgAAgCKggACAAIAIACgAKALAAAKAqkCKAAooKAAAoAoKAoACgigAqgABAKAAoAAAAAoAoAIoAAAAAIAKACIAAAAAAgAkgAAAiACACggAggIAAgAAgIAgAkgCiIgAEggACACAAAoACiwAAACqoIoACigQCgAKALAAKoACgKIAqgAACgAAKAAAAAKAKAAAAAAAAACIAAAAAAgAAgAAAIgAgoAIAiBIIAAgAkgAgCACACoiAAEggCACAAQACgAKEAoAAKKKigAAKKCgAKAAKCgKAAoIoAKoAAAoAACgAAAAAACgAAAAAgAAAAAAACAACAAAAiACACggAggIAAAgAgIAgAAgCKggACSAAgAgAICgoACgCgAAoCqQIoACigAoACgCwACqAAoCwIAAqgAACgAAKAAAAAAAAAAAAAAAAAAACAACAAAAiABIIKACAIgSCAAIAIACAIAJIAoiIAACAAIAIACAoKAAoAsAAAAqqCKAAAosAoACgACgoCgAKCKACqAAAAKAAAoAAAAAAAAAAAAAAAAAIAAIAAAACIAIAKCACCAgAACACSCAIAAIAKiIAASCAAIAICAAsAAoAChAKAACiioQCgAKKACgAKAKACgKAAoIoAKoAAAAAoAACgAAAAAAAAAAAAAgAAgAAAAAIgAgAoIAIIACAAIAIACAIAJIACKggACSAAgAgEggAAKCgAKAKAACgKoIoAACigoAACgCgAqgAAKCKACqAAAAAKAAAAAoAAAAAAAIAAAAIAAAAACIAIAKCAAIgAgACAACAgCAACACiIgAAIAAgAgIAAACgoAAChAKAACiioQCgAKKACgAKAKACgKAAoAIoAAKoAAAAZBQAAAAAAAAAAAAATIAAAAAIgAAgAoAIAIIACAAIAIACAIAJIACKggACSAAgAAgIAAgKLAAKAAoAoAAKAqgigAAKKCgAAKAKKCKAoACgAigAAqgAAAAABkDIKAAAAACZAyAAAAAAACIAAIAKACACCACoIAIAAICAIAAIAKIiAAAgACACASCAIACgCgoAAChAKAACiioQCgAKKACgAAKAKACgKAAAoIoAAAKoAAAAAAAAAAAAAAAAAAAiAAACACggAAggAIAAgAAgAIAgAkgAIqCAAJIACAACAgACAAAosAAoACgCgAAoCqCKAAAooAKAAoAAoAKAoAACgKIAAAAqgAAAAAAAAAAAAAACIAAAAIKACAACCAAgAACACAAgCAACACiIgAAIAAgAgEggCAAAAoAoKAAAoQCgAAoCqCKAAAooAKAAoAAoAKAoAACgAi5AAAAABVAAAAAAAAAEQAAAAMggAoAIAAIIACAAAIAIACAIAAIAKIiAAAkgAIAAICAAIAAAACiwACgAKAKAAACiioQCgAAKKCgAAKAAKKCAKAoAACgAi5AAAAAAAAAAAAAAAAAyCACgAgAAggAAqCAACAACAgCAACSAAioIAAAgACACASCAIAAAAACgCgoAACgCgAAoCqCKAAAoAoKAAAoAAooIAoCgAAAKAACALkDIAAAAAAGQMggAAoAAIAAAIIAAKggAAgAAgIAAgAAgAoiIAACAAIAAICAAIAAAAAACiwACgAKAEAoAAKAqgigAAKKACgAAAKAALkAAFAUAAABQAAAAAAAAAAAAAAAQAAAQQADIIAAAgAAAgAIAgAAgAoiIAACSAAAgAgEggCAAAAAAAAoAoAKAAoAsAAAAoooCKAAAooAAKAAAoAAopkQABQFAAAAAAAUAAAAAEAAAAAAEEAAyAKggAAgAAgAAIAgAAgAogggABIIAAgAgAIAAgAAAgKAAAAoAoKAAAoAoAAAKKKgCgAAKAKACgAAKAAAKKZEAAUABQAAAAAAAAAAAAAQAQADIAqCAAACAACAAgACAACAAIqCAAAIAAgAAgIAAgAAAgAKAAAAoAoAKAAoAQCgAAAooqAKAAAAooGQUAAABQAAABcgAAAAoAAAAAAAAAIAAABkEAAAAAQAAATIAIAgAAAgACKggAACSAAAgAgAIAAgAAAgAAKAAAAoAoAKAAoAQCgAAAooqAKAAAAooAAKAAAAoAAAACrkQyBkAAAAAAAADIGQMggoIAAAAIAAAIAACAIAAAIAAioIAAAkgAAIAIACAAIAAAIAAACgAAAAKAKCgAAKAEAoAAAKKKAigAAAKAKBkFAAAAAUAAAAAAAAAUAEAAAAAAAAAAQAAAATIAIAAgAAAgAogggAACSAAAgAAgIAAgAAAAgAEAAAoAAAACigAoAACgCxIAAAAKKKAgCgAAAKKABkFAAAAAAAUAAAAAAAAAAAAAEAAAAAAEyAACAIAAAIAAKIIIAAATIIAAgAAgAIAgAAAAgAAAAAAKAAAAoAoAKAAAoAsSAAAACgKoIAoAAACgCgAZABQAAAAAAAAAAAAAAAAAAAAAQDIAAIAAgAAAgAAoiIAAABMggACAACAAgACAAACAAAAAAAAoAAAACgCgAoAACgBEgoAAAKAKKgCgAAAAKAKAABkAFAAAAAAAAAAAAAAABAMgAAAgACAAAACAAIoIgAAAJMgAAIAAIACAAIAAAAIAAAAAAAACgAAAAKAKACgAAKAGQUAAAAFFFAQBQAAAAAFAFAAAyBkDIGQAAUAEAAyBkDIGQAAAQABAAAAABAABRBBAAAAEyAAAgAAgAIAAgAAAAgAAAAAAAAAAKAAAAAoAoAKAAAoAAoAAAAKAKKAgCgAAAAAAKAAKAAAAAAAAAAACAAAIAAAAAAIAAKIAiAAAAAgAACAACAAgACAAAACAAAAAAiCqAAAAAKAAAAAoAoAKAAAoAAuQAAAAAUAUUBAFyAAAAAAAAAAoAAAAAAAIAAAAAAAAGQQAAUQBEAAAAAyCAAAIAAIACAAIAAAAIAAAAACIAAKoAAAAAoAAAACgCgAoAAACgBkFAAAAABQBRQEAMgoAAAAAAAAAAAAAAAAAAAAAJkAAAUQBEAAAAABMgAAIAAAIACAAIAAAAIAAAAACIAAACigAAAAAoAAAACgCgAAoAACgAC5AAAAAABQBRQAEAAMguQAAAAAAAAAAAAMgmQAAABQBAEQAAAAADIIAAAgAAgAAIAAgAAAAgAAAAAIAgAAAAqgAAAAACgAAAAKAAKACgAAAKAALkAAAAAAAFAFAFAAQAAAAAAAAAAAAAFAEAARAAAAAAAMggAACAAACAAgAACAAAACAAAAAAAiAAAAAACqAAAAAAKAAAAAoAAoAKAAAAoAAAuQAAAAAAAAUAAUAAAUAAAAAEAAAAQBAAAAAAAAMggAAACAAACAAgAACAAAACAAAAAAAiAAAAAAAACqAAAAAAKAAAAAAoAuQAAUAAABQAAAyCgAAAAAAAAAAAAAoAIAAAAAAAAAAAAACZAAAAAQAAAQADIIAAgAAAAAgAAAAAAIgAAAAAAAAAAqgAAAAACgAAAAAKAAKAACgAAAKAAAAGQXIAAAAAAAAAAAAAAAAAAAAAAGQTIAAAAACAAACAAAgAACAAAAACAAAAAAAiAAAAAAAAAAAACqAAAAAAKAAAAAAAoAAoAAKAAAAAoAAAAZBcgZAAAAAAAAAAAAAAAyBkEyAAAAAAgAAAAgAAIAAAgAAAAAAgAAAAAAIgAAAAAAAAAAAAAAqgAAAAAACgAAAAAKAAAKAACgAAAAAKAAAAAAAGQMgZAyBkDIGQMgAAAAAAAAIAAAAAIAACAAAAIAAAAAIAAAAAAACIAAAAAAAAAAAAAAAAKoAAAAAAAoAAAAAACgAAC5AABQAAAAAAAFAAAAAAAAAAAAAAABAAAAAAABAAMggAAACAAAAAACAAAAAAAAiAAAAAAAAAAAAAAAAAAAooAAAAAAAKAAAAAAAoAAAuQAAAAUAAAAAAAAAAAAAAAAAAAAAAAEAAAAyCAAAAIAAAAAAIAAAAAAACAIAAAAAAAAAAAAAAAAAAAAAKoAAAZAAABQAAAAAAAAFAAAFyAAAAACgAAAAAAAAAAAAAAAgAAAAGQQAAABAAAAAAAABAAAMgAAAAiAAAAAAAAAAACIqqgAAAAAAAAAACqAAAAAAAAKAAAAAAAAAAoAAAAuQMgAAAAAAAAAAAAAAAAZAyCAAAAAIAAAAAAAAAIAAAAAAAACIAAAAAAAAAAAIigAKqAAAAAAAAAAAAKoAAAAAAAAoAAAAAAAAAACgAAAAAAAC5AyBkDIGQMggAAAAAAAACAAAAAAAAAACAAAAAAAAAiAAAAAAAAAAAACIoAAACqgAAAAAAAAAAACqAAAAGQAAAAAUAAAAAAAAAAAABQAAAAAAAAAAAAAQAAAAAAAAAAAAQAAAADIAAAAAIgAAAAAAAAAAAAiKAAAAAAqoAAAAAAAAAAAAAqgAAABkAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAMgAAAAAiAAAAAAAAAAAAACIoAAAqACKAAKigAAAAAAAAAAAAAqgAAAABkAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAMgAAAAAAiAAAAAAAAAAAAACAIoAAqAAAACKAAKKIAAAAAAAAAAAAAAqgAAAABkAAAAAAAAFAAAAAAAAAAAAAAAAAAABAAAAAAAAMgAAAAAAiAAAAAAAAAAAAAACCiAAAqAAAAAACKAAAqoAAAAAAAAAAAAAAAqgAAAAABkDIAAAAAAAAAAAAKAAACAAAAAAAAAAAAZAyAAAAAAACIAAAAAAAAAAAAAAAIigAACoAAAAAAAAIoAABlUUAAAAAAAAAAAAAAAAFUAAAAAAAMgZAAAAAAAAAAAAAAAAAAAAAyBkAAAAAAAAEQAAAAAAAAAAAAAAAATICKAAAKgAAAAAAAAAAAigAAKqAAAAAAAAAAAAAAAAAAKoAAAAAAAAAAAZAyBkDIGQMgZAyBkDIAAAAAAAAAAAAIgAAAAAAAAAAAAAAAAAAiKAAAKgAAAAAAAAAAAAAAigAACooAAAAAAAAAAAAAAAAAAACigAAAAAAAAAAAAAAAAAAAAAAAAAgCAAAAAAAAAAAAAAAAAAACAIoAAAqAAAAAAAIgqgAAAAAAAAigAAGVRQAAAAAAAAAAAAAAAAAAAAAAAFFAAAAAAAAAAAAABAEAAAAAAAAAAAAAAAAAAAAAAAEyAigAACoAAAAAAAAiAAAooAAAAAAACKAAAAZVFAAAAAAAAA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") !important;
					min-width: 100% !important;
					background-size: 100% 100% !important;
				}
				.theLogin>div:last-child{
					width:100% !important;
				}
				.theLogin.content .c_body{
					-webkit-box-orient: vertical;
				    -webkit-box-direction: normal;
				    -ms-flex-direction: column;
				    flex-direction: column;
				    max-height:100vh;
				    overflow:auto;
				}
				.theLogin.content .c_body>div:first-child{
					margin-top: 13.5vh !important;
					margin-left: 0 !important;
					text-align: center;
				}
				.theLogin.content .c_body>div:first-child p:first-child{
				    font-size: 20px !important;
				}
				.theLogin.content .c_body>div:first-child p{
				    font-size: 14px !important;
				}
				.theLogin.content .c_body>div:last-child{
					width: 100% !important;
					background: transparent !important;
					-webkit-box-shadow: none !important;
					box-shadow: none !important;
				}
				.theLogin.content .c_body>div:last-child ul li:first-child,
				.theLogin.content .c_body>div:last-child ul li:nth-child(3),
				.theLogin.content .c_body>div:last-child ul li:first-child span,
				.theLogin.content .c_body>div:last-child ul li:nth-child(3) span{
					color:#fff !important;
				}
				.theLogin.content .c_body>div:last-child input{
					background: transparent !important;
					color: #fff;
				}
				.theLogin.content .c_body>div:last-child input:focus{
					border-color: #da51c2 !important;
				}
				.theLogin.content .c_body>div:last-child ul li:nth-child(5) label{
					display: none;
				}
				.theLogin.content .c_body>div:last-child ul li:nth-child(5) > span{
					color: #fff !important;
				    position: relative;
				    top: -30px;
				    text-decoration: underline;
				}
				.theLogin.content .c_body>div:last-child ul li:last-child button{
					background: #6d59c9;
				}
				.theLogin.content .winup>div{
					margin: 0 15px;
				}
				.theLogin.content .winup>div ol li span{
					width: auto;
				}
				.theLogin.content .winup>div ol li input{
					width: 100%;
					margin-top: 5px;
				}
				.theLogin.content .winup>div ol li input+i.show.no{
					top: 26px;
				}
				.theLogin.content .winup>div ol li input+i.show{
					top: 28px;
				}

				#main{
					min-width: auto !important;
				}
				#main > .el-container{
					width: 100%;
				}
				#theTop,
				#main > .foot,
				#main > .el-container > .el-aside,
				#main > .el-container > .el-container > header,
				#main > .el-container > .el-container > main > div:first-child,
				#main > .el-container > .el-container > main .nowTime li:first-child,
				#main > .el-container > .el-container > main .amountDetails div:last-child{
					display: none;
				}
				#main > .el-container > .el-container > main{
					padding: 50px 0 0 0;
				}
				#main > .el-container > .el-container > main > div:last-child{
					overflow: hidden;
				}
				#main > .el-container > .el-container > main .nowTime{
					margin-top: 0;
				}
				#main > .el-container > .el-container > main .nowTime li:last-child{
					border-left: 0;
				}
				#main > .el-container > .el-container > main .nowTime li:nth-child(2){
					position: relative;
					overflow: hidden;
				}
				#main > .el-container > .el-container > main .nowTime li:nth-child(2) div:first-child{
					position: absolute;
					top: 20%;
					opacity: 0.25;
				}
				#main > .el-container > .el-container > main .nowTime li:nth-child(2) div:last-child{
					text-align: center;
				}
				#main > .el-container > .el-container > main .nowTime li:nth-child(2) div img{
					width: 140px;
					margin-right: 0;
				}
				#main > .el-container > .el-container > main .amountDetails div:first-child{
					width: 100%;
				}
				#main > .el-container > .el-container > main .amountDetails > div:first-child{
					margin-right: 0;
				}
				#main > .el-container > .el-container > main .amountDetails > div:first-child > ul{
					padding: 0;
				}
				#main > .el-container > .el-container > main .amountDetails > div:first-child > ul > li:first-child{
					background: transparent;
					margin: 0;
					border-bottom: 10px solid #f2f2f2;
				}
				#main > .el-container > .el-container > main .amountDetails > div:first-child > ul > li:nth-child(2){
					display: none;
				}
				#main > .el-container > .el-container > main .amountDetails > div:first-child > ul > li:nth-child(3){
				    background: #f2f2f2;
				    margin: 0;
				    padding: 0 3px;
				}
				#main > .el-container > .el-container > main .amountDetails > div:first-child > ul > li:nth-child(3) ol{
					margin: 0 0px -10px;
				}
				#main > .el-container > .el-container > main .amountDetails > div:first-child > ul > li:nth-child(3) ol li{
					background: #fff;
				    margin: 0 4px;
				    padding: 3px 0;
				    box-shadow: 0 0 5px 0px rgba(0, 0, 0, .05);
				}
				#main > .el-container > .el-container > main .amountDetails > div:first-child > ul > li:nth-child(4){
					background: #f2f2f2;
					margin: 0;
					padding: 20px 10px 5px 0;
				}
				#main > .el-container > .el-container > main .amountDetails > div:first-child > ul > li:first-child ol{
					-webkit-box-pack: space-around;
				    -ms-flex-pack: space-around;
				    justify-content: space-around;
				}
				#main > .el-container > .el-container > main .amountDetails > div:first-child > ul > li:first-child ol li{
					width: 120px;
					height: 120px;
					margin: 0;
					border-width: 6px;
					text-align: center;
				}
				#main > .el-container > .el-container > main .market{
					margin-bottom: 0;
				}
				#main > .el-container > .el-container > main .bonus>p,
				#main > .el-container > .el-container > main .teamInfo>p,
				#main > .el-container > .el-container > main .market>p{
					border-bottom: 0;
					position: relative;
				}
				#main > .el-container > .el-container > main .bonus>p:after,
				#main > .el-container > .el-container > main .teamInfo>p:after,
				#main > .el-container > .el-container > main .market>p:after{
				    content: "";
				    position: absolute;
				    width: 100%;
				    height: 1px;
				    background: #ccc;
				    top: 24px;
				    left: 0;
				}
				#main > .el-container > .el-container > main .bonus>p span,
				#main > .el-container > .el-container > main .teamInfo>p span,
				#main > .el-container > .el-container > main .market>p span{
					background: white;
				    position: relative;
				    z-index: 1;
				    padding-right: 0.5em;
				    height: 25px;
				}
				#main > .el-container > .el-container > main .teamInfo>div>ul>li:nth-child(2) ul>li:nth-child(n+2) ol li:first-child{
					line-height: 1.25;
					display: flex;
					-webkit-box-align: center;
					-ms-flex-align: center;
					align-items: center;
				}
				#main > .el-container > .el-container > main .teamInfo>div>ul>li>p,
				#main > .el-container > .el-container > main .market.market>div>ul>li>p{
					-webkit-box-align: center;
					-ms-flex-align: center;
					align-items: center;
				}

				#mobileHead{
					display: block !important;
				}

				#mobileMenu{
					display: flex !important;
				}
				#mobileMenu .m_content > li:nth-child(3) .el-menu{
				    width: 100%;
			  	}

			  	.form-title{
					position: relative;
					border-bottom: 0;
					margin-bottom: 5px;
			  	}
			  	.form-title:after{
					content: "";
					position: absolute;
					top: 40px;
					left: 0;
					width: 100%;
					height: 1px;
					background: #ccc;
			  	}
			  	.form-title > span{
					background: #fff;
					position: relative;
					z-index: 1;
					padding-right: 0.5em;
					display: inline-block;
					height: 24px;
			  	}
				  .form-title.searchBox{
  					position: relative;
  					border-bottom: 1px solid #ddd;
  					margin: -25px 10px 40px;
  					flex-wrap: wrap;
  					background: transparent;
            font-size: 12px;
			  	}
			  	.form-title.searchBox:after{
					 display: none;
			  	}
			  	.el-form .el-form-item .el-form-item__label{
			  		text-align: left;
		  		    margin-right: 0;
			  	}
			  	.el-form .el-form-item .el-form-item__content{
			  		flex: 1;
			  	}
			  	.el-form .el-form-item .el-form-item__content .el-input{
			  		width: 100%;
			  	}
			  	.el-form .el-form-item .el-form-item__content .el-input__inner{
			  		border: 1px solid #ccc;
			  	}
			  	.el-form .el-form-item.is-error .el-input__inner{
			  		border-color: #f56c6c;
			  	}
			  	.el-form .el-form-item .el-form-item__content .el-form-item__error{
			  		position: initial;
				    display: block;
				    border: 0;
				    margin: 0;
				    text-align: right;
				    margin-bottom: -20px;
			        padding: 4px 10px;
			  	}
			  	.el-form .el-form-item .el-form-item__content .el-form-item__error:before,
			  	.el-form .el-form-item .el-form-item__content .el-form-item__error:after{
			  		display: none;
			  	}
			  	.el-form .el-form-item .el-form-item__content .el-input+b{
			  		right: 46px !important;
			  	}
			  	.el-form .el-form-item[style="margin: 10px 0px 10px -70px;"] div{
		  		    background: #f2f2f2;
				    margin: -20px -10px -20px 0;
				    padding: 10px 10px 20px 70px;
				    display: flex;
				    justify-content: center;
			  	}
			  	.el-form .el-form-item[style="margin: 10px 0px 10px -70px;"] div .el-button{
					margin: 0;
					width: 100% !important;
			  	}
			  	.placingPop > div{
		  			width: 95% !important;
			  	}
			  	.placingPop > div ul > li > p:first-child{
		  			width: 100% !important;
			  	}
			  	.placingPop.winup>div ul li{
			  		width: 100%;
			  	}
			  	.bankSet{
					margin-left: 0 !important;
					width: 100% !important;
					left: 0 !important;
					margin-top: 220px;
			  	}
			  	.bankSet+div{
					top: 70px !important;
					left: 0 !important;
					right: 0;
			  	}
			  	.bankSet+div > p:first-child{
					width: 275px !important;
					height: 180px !important;
					margin: 0 auto;
			  	}
			  	.bankSet+div > p:last-child{
					background: rgba(0, 0, 0, .5);
					width: 275px;
					margin: -31px auto !important;
					position: relative;
					border-radius: 0 0 13px 13px;
					height: 30px;
					line-height: 30px;
			  	}
			  	.bankSet+div > p:last-child label{
					color: #fff !important;
			  	}
			  	.el-form-item__content .el-select{
			  		width: 100%;
			  	}
			  	.el-textarea{
			  		width: 100%;
			  	}
    			.el-textarea textarea{
    				border: 1px solid #dcdfe6;
    			}
    			.winup>div{
    				width:90%;
    			}
    			.winup .el-form .el-form-item[style="margin: 10px 0px 10px -70px;"] div{
    				background: transparent;
    			}
    			.halfLine{
    				flex-direction: column;
    				width: 100%;
    				margin: 0;
    			}
    			.halfLine .el-form-item{
    				height: 40px;
    				width: 100%;
    			}
    			.searchBox .el-button{
    				width: auto;
    				padding: 0 5px;
    			}
    			.tree ol{
    				width: 100% !important;
    			}
    			.searchBox .el-date-editor{
    				width: 101px !important;
    			}
    			.searchBox .el-date-editor .el-input__inner{
					padding-right: 5px;
					padding-left: 22px;
    			}
    			.searchBox .el-date-editor .el-input__prefix{
    				left: 0;
    			}
    			.searchBox .el-date-editor .el-input__suffix{
    				display: none;
    			}
    			.form-title.searchBox b{
    				margin-top: 15px;
    			}

    			#DailyReminder.winup>div ul{
    				padding:20px 10px;
    			}
    			#DailyReminder.winup>div ul li:nth-child(4) a{
    				width: auto;
    			}

    			.listInfo.winup>div>ul>li:first-child ol li{
    				width:100%;
    			}
    			.listInfo.winup>div>ul>li:first-child ol li p span{
    				width:6em;
    			}
    			.listInfo.winup>div>ul>li:first-child ol li p b img{
    				width:100% !important;
    			}

    			.el-message-box{
    				width: 97%;margin: 1.5%;
    			}

    			.form-title.searchBox b:last-child{
    				flex:1;
    				text-align:right;
    			}
    			.winup>div ul li{
    				width:100%;
    			}
    			.winup>div ul li a{
    				width:auto;
    				margin-left:10px;
    				margin-right:10px;
    			}
    			#retrive .form-title.searchBox{
    				position:relative;
    				height:104px;
    			}
    			#retrive .form-title.searchBox>b:last-child>span{
				    position: absolute;
					left: -10px;
					top: 75px;
    			}
    			#retrive .form-title.searchBox>b:last-child button{
				    margin-top: 50px;
    			}
    			#retrive .items>li{
    				overflow: auto;
    			}
    			#retrive .items>li>div{
    				width: 200%;
    			}
    			#rechargeRetrive .form-title.searchBox>b>span:nth-child(3),
    			#withdrawalsRetrive .form-title.searchBox>b>span:nth-child(3){
    				margin-left:10px !important;
    			}
    			i.show+p{
					right: 0 !important;
					width: auto !important;
					line-height: 1.25 !important;
    			}
    			.el-select-dropdown{
    				max-width: 95%;
    			}
			</style>`;
    	return {isCollapse,styleDom}
    },
    created(){
    	window.onresize = _ => {
    		this.isCollapse = window.innerWidth < 900;
    	};
    }
  }
</script>

<style>
	
</style>
