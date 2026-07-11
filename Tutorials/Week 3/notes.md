# Intro to Vue Js

## Points to remember
1. There are two properties in app object of Vue class namely computed and methods, the difference between them is that the methods are manually called and triggered while the computed methods are automatically trigerred whenever there are some changes made in the data members. Also in order to access them in the html, we call directly access those without calling the func. 

2. if we have methods and computed and inside that, we have defined some functions, then to access the data members, we do this.name, this.message etc. and not this.data.name, this.data.message as that is automatically handelled by veu.
3. Properties like computed, methods, watch, etc. are known as options objects as these are optional and are used whenever required.