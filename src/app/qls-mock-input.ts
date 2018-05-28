export const validQLS = `
stylesheet "taxOfficeExample"
{
  page "Housing"
  {
    section "Buying"
    {
      question question3
        widget checkbox
    }
    section "Loaning"
      question question4
  }

  page "Selling"
  {
    section "Selling"
    {
      question question5
        widget text
      section "You sold a house"
      {
        question question1
          widget spinbox
        question question2
          widget spinbox
        question question6
        default integer
        {
          width: 400
          font-family: "Arial"
          font-size: 14
          color: #999999
          widget spinbox
        }
      }
    }
    default boolean widget radio("Yes", "No")
  }
}
`;

export const widgetStyleSheet = `
stylesheet "widgets"
{
  page "Page" {
    section "Section" {
      question question1 widget radio("Yes", "No")
      question question2 widget text
      question question3 widget checkbox
      question question4 widget spinbox
      question question5 widget dropdown("Yes", "No")
      question question6 widget slider
    }
  }
}
`;
