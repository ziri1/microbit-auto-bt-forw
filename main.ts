input.onButtonPressed(Button.A, function () {
    if (pin8 == 1) {
        pin8 = 0
        pins.digitalWritePin(DigitalPin.P8, pin8)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else {
        pin8 = 1
        pins.digitalWritePin(DigitalPin.P8, pin8)
        basic.showString("A")
    }
})
input.onButtonPressed(Button.B, function () {
    if (pin12 == 1) {
        pin12 = 0
        pins.digitalWritePin(DigitalPin.P12, pin12)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else {
        pin12 = 1
        pins.digitalWritePin(DigitalPin.P12, pin12)
        basic.showString("B")
    }
})

enum movement {
    LEFT,
    RIGHT,
    FORWARD,
    STOP
}

control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    switch (control.eventValue())
    {
        case EventBusValue.MES_DPAD_BUTTON_1_DOWN:
            button1 = 1;
            break;
        case EventBusValue.MES_DPAD_BUTTON_1_UP:
            button1 = 0;
            break;
        case EventBusValue.MES_DPAD_BUTTON_2_DOWN:
            button2 = 1;
            break;
        case EventBusValue.MES_DPAD_BUTTON_2_UP:
            button2 = 0;
            break;
        case EventBusValue.MES_DPAD_BUTTON_C_DOWN:
            buttonc = 1;
            break;
        case EventBusValue.MES_DPAD_BUTTON_C_UP:
            buttonc = 0;
            break;
        case EventBusValue.MES_DPAD_BUTTON_D_DOWN:
            buttond = 1;
            break;
        case EventBusValue.MES_DPAD_BUTTON_D_UP:
            buttond = 0;
            break;
    }
    currentMovement = convertDpadToMovement()
    setMovement( currentMovement )
})

function convertDpadToMovement()
{
    if ( buttonc == 1 && buttond == 0 ) return movement.LEFT;
    else if ( buttonc == 0 && buttond == 1 ) return movement.RIGHT;
    else if ( button1 == 1 ) return movement.FORWARD;
    else return movement.STOP;
}

bluetooth.onBluetoothConnected(function () {
    setMovement( movement.STOP )
    basic.showString("C")
})
bluetooth.onBluetoothDisconnected(function () {
    setMovement(movement.STOP)
    basic.showString("D")
})

function setMovement( m:movement )
{
    switch(m)
    {
        case movement.LEFT:
            pin12 = 1;
            pin8 = 0;
            basic.showArrow(ArrowNames.NorthWest)
            break;
        case movement.RIGHT:
            pin12 = 0;
            pin8 = 1;
            basic.showArrow(ArrowNames.NorthEast)
            break;
        case movement.FORWARD:
            pin12 = 1;
            pin8 = 1;
            basic.showArrow(ArrowNames.North)
            break;
        case movement.STOP:
            basic.clearScreen()
            pin12 = 0;
            pin8 = 0;
            break;
    }
    pins.digitalWritePin(DigitalPin.P8, pin8)
    pins.digitalWritePin(DigitalPin.P12, pin12)
}
let pin12 = 0
let pin8 = 0
let button1 = 0
let button2 = 0
let buttonc = 0
let buttond = 0
let currentMovement = movement.STOP
basic.showString("1")
setMovement( currentMovement )
