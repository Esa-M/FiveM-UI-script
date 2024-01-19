local ProgressBarData = nil

local function StartProgressBar(message, length, params)
    -- Another ProgressBar is active
    if ProgressBarData then
        return false
    end

    ProgressBarData = params

    -- Freeze the Player if requested
    if ProgressBarData.FreezePlayer then
        FreezeEntityPosition(PlayerPedId(), ProgressBarData.FreezePlayer)
    end

    -- Send meesage to the NUI
    SendNUIMessage({
        type = "StartProgressBar",
        length = length,
        message = message
    })
end

RegisterNUICallback("progress_completed", function (data, cb)
    if ProgressBarData ~= nil then
        -- Unfreeze Player
        if ProgressBarData.FreezePlayer then
            FreezeEntityPosition(PlayerPedId(), false)
        end

        -- Invoke the completion callback function if any
        if ProgressBarData.completionCallback then
            ProgressBarData.completionCallback()
        end

        -- TODO: Use data from NUI

        -- Reset the ProgressBarData
        ProgressBarData = nil
    end

    cb({})
end)

local function CancelProgressBar()
    -- No progress bar is active
    if ProgressBarData == nil then
        return
    end

    -- Send closing message to NUI
    -- TODO: Will this work? it might not work if the NUI is a blocking one?
    SendNUIMessage({
        type = "CancelProgressBar"
    })
end

RegisterNUICallback("progress_cancelled", function (data, cb)
    if (ProgressBarData ~= nil) then
        -- Unfreeze Player
        if ProgressBarData.FreezePlayer then
            FreezeEntityPosition(PlayerPedId(), false)
        end

        -- Invoke the cancellation callback function if any
        if ProgressBarData.cancellationCallback then
            ProgressBarData.cancellationCallback()
        end

        -- Reset the ProgressBarData
        ProgressBarData = nil
    end

    cb({})
end)

ESX.RegisterInput("cancelprog", "[ProgressBar] Cancel Progressbar", "keyboard", "BACK", CancelProgressbar)

exports('StartProgressBar', StartProgressBar)
exports('CancelProgressBar', CancelProgressBar)