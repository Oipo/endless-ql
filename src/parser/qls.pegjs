// pegjs parser definition
stylesheet            = whitespace comment* whitespace "stylesheet" whitespace "\"" name:text "\"" whitespace "{" whitespace
                          pages: page*
                          whitespace comment* whitespace
                        "}" whitespace {
                          return new astQls.Stylesheet(name, pages, location());
                        }

page                  = pageWithDefault / pageWithoutDefault

pageWithDefault       = whitespace comment* whitespace "page" whitespace "\"" name:text "\"" whitespace "{" whitespace
                          sections: section*
                          d: default
                          whitespace comment* whitespace
                        "}" whitespace {
                          return new astQls.Page(name, sections, location(), d);
                        }

pageWithoutDefault    = whitespace comment* whitespace "page" whitespace "\"" name:identifier "\"" whitespace "{" whitespace
                          sections: section*
                          whitespace comment* whitespace
                        "}" whitespace {
                          return new astQls.Page(name, sections, location());
                        }

section               = sectionWithDefault / sectionWithoutDefault / sectionMinimal

sectionWithDefault    = whitespace comment* whitespace "section" whitespace "\"" name:text "\"" whitespace "{" whitespace
                          questions: question*
                          sections: section*
                          d: default
                          whitespace comment* whitespace
                        "}" whitespace {
                          return new astQls.Section(name, sections, questions, location(), d);
                        }

sectionWithoutDefault = whitespace comment* whitespace "section" whitespace "\"" name:text "\"" whitespace "{" whitespace
                          questions: question*
                          sections: section*
                          whitespace comment* whitespace
                        "}" whitespace {
                          return new astQls.Section(name, sections, questions, location());
                        }

sectionMinimal        = whitespace comment* whitespace "section" whitespace "\"" name:identifier "\"" whitespace question:question {
                          return new astQls.Section(name, [], [question], location());
                        }

question              = questionWithType / questionWithoutType

questionWithType      = whitespace comment* whitespace "question" whitespace name:identifier whitespace type:defaultWidget {
                          return new astQls.QlsQuestion(name, type, location());
                        }

questionWithoutType   = whitespace comment* whitespace "question" whitespace name:identifier {
                          return new astQls.QlsQuestion(name, new astQls.Widget(astQls.WidgetType.NONE, []), location());
                        }

default               = defaultWithStyles / defaultWithoutStyles

defaultWithStyles     = whitespace comment* whitespace "default" whitespace type:type whitespace "{" whitespace
                          styles:style*
                          widget: defaultWidget
                          whitespace comment* whitespace
                        "}" {
                          return new astQls.DefaultStyling(type, widget, styles, location());
                        }
defaultWithoutStyles  = whitespace comment* whitespace "default" whitespace type:type whitespace widget:defaultWidget {
                          return new astQls.DefaultStyling(type, widget, [], location());
                        }

defaultWidget         = whitespace comment* whitespace "widget" whitespace type:widget {
                          return type;
                        }


style                 = numberStyle / hexStyle / asciiStyle

numberStyle           = whitespace comment* whitespace name:identifier ":" whitespace value:number {
                          return new astQls.Style(name, value, location());
                        }

hexStyle              = whitespace comment* whitespace name:identifier ":" whitespace value:hex {
                          return new astQls.Style(name, value, location());
                        }

asciiStyle            = whitespace comment* whitespace name:identifier ":" whitespace "\"" value:ascii "\"" {
                          return new astQls.Style(name, value, location());
                        }

text                  = (whitespace word whitespace)+ {return text();}

type                  = booleanType /
                        stringType /
                        integerType /
                        dateType

widget                = radioWidget /
                        textWidget /
                        checkboxWidget /
                        spinboxWidget /
                        dropdownWidget /
                        sliderWidget

// low-level

whitespace = [ \t\n\r]* {return;}
identifier 		  = [a-zA-Z0-9\-]+ {return text();}
expression 		  = [a-zA-Z0-9 +\-\/*><=]+ {return text();}
comment         = "//" (!lineTerminator .)*
lineTerminator  = "\n" / "\r\n" / "\r" / "\u2028" / "\u2029"

number          = val:([0-9]+) {return new astQls.NumberValue(parseInt(text(), 10));}
hex             = "#" r:([0-9][0-9]) g:([0-9][0-9]) b:([0-9][0-9]) {
                    const parsedRed = parseInt(r[0] + r[1], 10);
                    const parsedGreen = parseInt(g[0] + g[1], 10);
                    const parsedBlue = parseInt(b[0] + b[1], 10);
                    return new astQls.RgbValue(parsedRed, parsedGreen, parsedBlue);
                  }
word            = [a-zA-Z0-9\:\?\\\/\.\,\;\!]+ {return text();}
ascii           = [a-zA-Z]+ {return new astQls.StringValue(text());}

//types
booleanType     = "boolean" { return new BooleanQuestionType(); }
stringType      = "string" { return new StringQuestionType(); }
integerType     = "integer" { return new IntQuestionType(); }
dateType        = "date" { return new DateQuestionType(); }

//widgets
radioWidget     = "radio" whitespace "(\"" yesValue:identifier "\"," whitespace "\"" noValue:identifier "\")" {
                    return new astQls.Widget(astQls.WidgetType.RADIO, [yesValue, noValue]);
                  }
textWidget      = "text" { return new astQls.Widget(astQls.WidgetType.TEXT); }
checkboxWidget  = "checkbox" { return new astQls.Widget(astQls.WidgetType.CHECKBOX); }
spinboxWidget   = "spinbox" { return new astQls.Widget(astQls.WidgetType.SPINBOX); }
dropdownWidget  = "dropdown" whitespace "(\"" yesValue:identifier "\"," whitespace "\"" noValue:identifier "\")" {
                    return new astQls.Widget(astQls.WidgetType.DROPDOWN, [yesValue, noValue]);
                  }
sliderWidget    = "slider" { return new astQls.Widget(astQls.WidgetType.SLIDER); }





