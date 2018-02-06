export const findInSection = (sections, setID) => {
   const matchedSection = sections.find((section) => { 
        return section.data.find((d) => {
            return d.setID === setID;
        });
   });

   const sectionIndex = matchedSection.position;

   const itemIndex = matchedSection.data.findIndex((index) => {
       return index.setID === setID;
   });

   return ({ sectionIndex: sectionIndex, itemIndex: itemIndex });
};
